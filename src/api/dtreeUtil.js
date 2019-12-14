// 根据对象某个字段的唯一值获取该对象
function getObjByOnefield(objList, fieldName, fieldValue) {
	var obj = null;
	if (objList.length != 0 && objList.length > 0) {
		for (var i = 0; i < objList.length; i++) {
			obj = objList[i];
			if (obj[fieldName] == fieldValue) {
				break;
			}
		}
	}
	return obj;
}

// 根据对象唯一id值获取该对象的下级子对象
function getSonobjById(objList, parentidName, objidValue) {
	var sonobjList = [];
	if (objList.length != 0 && objList.length > 0) {
		for (var i = 0; i < objList.length; i++) {
			var obj = objList[i];
			if (obj[parentidName] == objidValue) {
				sonobjList.push(obj);
			}
		}
	}
	return sonobjList;
}

// 根据对象英文名称获取下级子对象
export function getSonobjByOnefield(objList, parentidName, objidName, fieldName, fieldValue) {
	var obj = getObjByOnefield(objList, fieldName, fieldValue);
	return getSonobjById(objList, parentidName, obj[objidName]);
}

// 根据某个字段的唯一值获取该对象的所有下级对象,参数sonobjList，如此定义：var sonobjList = [];
function getAllSonobjByOnefield(objList, parentidName, objidName, fieldName, fieldValue) {
	var obj = getObjByOnefield(objList, fieldName, fieldValue);
	var sonobjList = [];
	sonobjList.push(obj);
	sonobjList = getAllSonobj(sonobjList, objList, obj, parentidName, objidName);
	return sonobjList;
}

// 获取该对象的所有下级对象,参数sonobjList，如此定义：var sonobjList = [];
function getAllSonobj(sonobjList, objList, obj, parentidName, objidName) {
	var sonList = getSonobjById(objList, parentidName, obj[objidName]);
	sonobjList = sonobjList.concat(sonList);
	for (var i = 0; i < sonList.length; i++) {
		var sonobj = sonList[i];
		sonobjList = getAllSonobj(sonobjList, objList, sonobj, parentidName, objidName);
	}
	return sonobjList;
}

// 根据当前对象，获取所有的祖级对象，不包括旁系祖辈，参数parentobjList，如此定义：var parentobjList = [];
function getParentobjs(parentobjList, objList, obj, parentidName, objidName) {
	if (objList.length != 0 && objList.length > 0) {
		for (var i = 0; i < objList.length; i++) {
			var parentObj = objList[i];
			if (parentObj[objidName] == obj[parentidName]) {
				parentobjList.push(parentObj);
				parentobjList = getParentobjs(parentobjList, objList, parentObj, parentidName, objidName);
			}
		}
	}
	return parentobjList;
}

// 根据地区id获取完整的地区名称
function getDistrictById(districtList, dttid) {
	var district = getObjByOnefield(districtList, "dttid", dttid);
	var parentobjList = [];
	parentobjList = getParentobjs(parentobjList, districtList, district, "parentid", "dttid");
	var dttcname = "";
	for (var i = parentobjList.length - 1; i >= 0; i--) {
		dttcname = dttcname + parentobjList[i].dttcname;
	}
	dttcname = dttcname + district.dttcname;
	return dttcname;
}

//根据对象某个字段判断集合中是否包含该对象
function isHaveobjinlist(objList, fieldName, fieldValue) {
	var ishave = false;
	if (objList.length != 0 && objList.length > 0) {
		for (var i = 0; i < objList.length; i++) {
			obj = objList[i];
			if (obj[fieldName] == fieldValue) {
				ishave=true;
				break;
			}
		}
	}
	return ishave;
}