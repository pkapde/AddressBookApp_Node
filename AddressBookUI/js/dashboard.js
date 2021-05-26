let isUpdate = false;
let addressBookObj = {};

const createEmployeePayroll = (id) => {
    addressBookObj.profilePic = getSelectedValues('#name');
    addressBookObj.gender = getSelectedValues('[name=gender]').pop();
    addressBookObj.department = getSelectedValues('[name=department]');
    addressBookObj.salary = getInputValueById('#salary');
    addressBookObj.note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " +
        getInputValueById('#year');
        addressBookObj.startDate = new Date(parseInt(document.getElementById("year").value), parseInt(document.getElementById("month").value) - 1, parseInt(document.getElementById("day").value));
    alert(addressBookObj.toString());
    return addressBookObj;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    console.log(value);
    return value;

}