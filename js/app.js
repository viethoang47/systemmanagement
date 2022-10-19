const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


var button = $('#button');
var btnReg = $('#btnReg');
var formReg = $('#formReg');
var btnLogin = $('#btnLogin');
var formLog = $('#formLog');
var btnSave = $('#btnSave');
var btnCloseReg = $('#btnCloseReg');
var btnLog = $('#btnLog');
var btnCloseLog = $('#btnCloseLog');
var account = $('#account');
var searchForm = $('#searchForm');
var titleMain = $('#titleMain');
var formCustomer = $('#formCustomer');
var tbl__customer = $('#tbl__customer');
var cusCal = $('#cusCal');
var cusClear = $('#cusClear');
var tbl__page = $('#tbl__page');
var btnNext = $('.btnNext');
var btnPrev = $('.btnPrev');
var number__page = $('.number__page');
var btnSearch = $('#btnSearch');
var lookup__info = $('#lookup__info');
var close = $('#close');
var form__bill = $('#form__bill');
var billUpdate = $('#billUpdate');
var billCancle = $('#billCancle');

// Save Account to the LocalStorage
var storageKey = 'account';
var dataString = localStorage.getItem(storageKey);
var arrUser;
if (dataString) {
    arrUser = JSON.parse(dataString);
} else {
    arrUser = [];
}

//Click button Register
btnReg.onclick = function () {
    formReg.classList.toggle('open');
    formLog.classList.remove('open');
}

// Click button Save
btnSave.onclick = function () {
    var name = $('#txtName').value;
    var email = $('#txtEmail').value;
    var phone = $('#txtPhone').value;
    var pass = $('#txtPass').value;

    var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var regPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var user = {
        name: name,
        email: email,
        phone: phone,
        pass: pass
    }


    if (name == '' || email == '' || phone == '' || pass == '') {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    if (email.length > 0) {
        if (regEmail.test(email)) {
            $('#emailError').innerHTML = '';
        } else {
            $('#emailError').style.color = 'red';
            $('#emailError').innerHTML = 'Email không hợp lệ. Vui lòng kiểm tra lại!';
            return;
        }
    }

    if (phone.length > 0) {
        if (regPhone.test(phone)) {
            $('#phoneError').innerHTML = '';
        } else {
            $('#phoneError').style.color = 'red';
            $('#phoneError').innerHTML = 'Số điện thoại không hợp lệ. Vui lòng kiểm tra lại!';
            return;
        }
    }
    if (arrUser.push(user)) {
        alert('Đăng ký thành công!')
    }

    $('#txtName').value = '';
    $('#txtEmail').value = '';
    $('#txtPhone').value = '';
    $('#txtPass').value = '';

    var json = JSON.stringify(arrUser);
    localStorage.setItem(storageKey, json);
}

// Click button Close Register
btnCloseReg.onclick = function () {
    formReg.classList.remove('open')
}

// Click button Login
btnLogin.onclick = function () {
    formLog.classList.toggle('open')
    formReg.classList.remove('open')
}

// Đăng nhập
btnLog.onclick = function () {

    var emailLog = $('#txtEmailLog').value;
    var passLog = $('#txtPassLog').value;

    var user = localStorage.getItem(storageKey)
    var data = JSON.parse(user)

    var exist = data.find(data => data.email == emailLog && data.pass == passLog);

    if (!exist) {
        alert('False')
        return
    } else {
        alert('Success')
    }

    formLog.classList.remove('open')
    button.classList.add('hide')

    var username = exist.name

    var acc = ` <p id="user">
                    ${username}
                    <span><i class="fa-solid fa-user"></i></span>
                </p>
                <ul id="list">
                    <li id="search">Tra cứu thông tin</li>
                    <li id="manager">Quản lý thông tin formCustomer</li>
                    <li id="logout">Đăng xuất</li>
                </ul>`

    $('#account').innerHTML = acc

}

// Close Login
btnCloseLog.onclick = function () {
    formLog.classList.remove('open')
}

// Click Username
account.onclick = function () {
    var list = $('#list');
    var search = $('#search');
    var manager = $('#manager');
    var logout = $('#logout');


    list.classList.toggle('open');

    search.onclick = function () {
        searchForm.classList.add('open');
        formCustomer.classList.remove('open');
        tbl__customer.classList.remove('open');
        titleMain.classList.add('hide');
        tbl__page.classList.remove('open-flex');
    }
    manager.onclick = function () {
        formCustomer.classList.add('open');
        tbl__customer.classList.add('open');
        searchForm.classList.remove('open');
        titleMain.classList.add('hide');
        lookup__info.classList.remove('open');
        if (arrPerson.length > 3) {
            tbl__page.classList.add('open-flex');
            showListPages();
        }

    }
    logout.onclick = function () {
        if (confirm('Đăng xuất khỏi hệ thông?')) {
            window.location.replace('');
        }
    }
}

// Click Search
btnSearch.onclick = function () {
    var txtSearch = $('#txtSearch').value;

    if (txtSearch == '') {
        alert('Vui lòng nhập thông tin cần tra cứu!')
        return;
    }

    var person = localStorage.getItem(storageKeyPerson);
    var data = JSON.parse(person);
    var exist = data.find(data => data.name == txtSearch);

    lookup__info.classList.add('open');

    $('#lookupName').innerHTML = exist.name;
    $('#lookupAddress').innerHTML = exist.address;

    $('#chisomoi').innerHTML = exist.end;
    $('#chisocu').innerHTML = exist.start;
    $('#tieuthu').innerHTML = exist.end - exist.start;
    $('#thucte').innerHTML = exist.end - exist.start;
    $('#tongcong').innerHTML = exist.end - exist.start;

    if (exist.end - exist.start > 0 && exist.end - exist.start < 50) {
        $('#thanhtien').innerHTML = (exist.end - exist.start) * 1400;
    } else if (exist.end - exist.start > 50 && exist.end - exist.start < 100) {
        $('#thanhtien').innerHTML = (exist.end - exist.start) * 1500;
    } else if (exist.end - exist.start > 100) {
        $('#thanhtien').innerHTML = (exist.end - exist.start) * 1600;
    }

    $('#thueVAT').innerHTML = ((((exist.end - exist.start) * 1600) * 15) / 100);
    $('#total').innerHTML = (exist.end - exist.start) * 1600 + ((((exist.end - exist.start) * 1600) * 15) / 100);
    $('#bangchu').innerHTML = 'Đoạn này em chưa làm được!!!';

}

// Close Lookup
close.onclick = function () {
    lookup__info.classList.remove('open');
}


// Save Customer to the LocalStorage
var storageKeyPerson = 'person'
var dtString = localStorage.getItem(storageKeyPerson);
var arrPerson
if (dtString) {
    arrPerson = JSON.parse(dtString)
} else {
    arrPerson = []
}

// Calculator customer
cusCal.onclick = function () {
    var cusName = $('#cusName').value;
    var cusAddress = $('#cusAddress').value;
    var cusStart = $('#cusStart').value;
    var cusEnd = $('#cusEnd').value;
    var cusVat = $('#cusVat').value;

    if (cusName == '' || cusAddress == '' || cusStart == '' || cusEnd == '' || cusVat == '') {
        alert('Vui lòng nhập đầy đủ thông tin!')
        return
    }

    var Person = function (name, address, start, end, vat) {
        this.name = name;
        this.address = address;
        this.start = start;
        this.end = end;
        this.vat = vat;
    }
    var newPerson = new Person(cusName, cusAddress, cusStart, cusEnd, cusVat)

    if (isNaN(cusStart)) {
        $('.errorStart').style.color = 'red';
        $('.errorStart').innerHTML = 'Chỉ được nhập số';
        return
    } else {
        $('.errorStart').innerHTML = '';
    }

    if (isNaN(cusEnd)) {
        $('.errorEnd').style.color = 'red';
        $('.errorEnd').innerHTML = 'Chỉ được nhập số';
        return
    } else {
        $('.errorEnd').innerHTML = '';
    }

    if (cusStart == 0) {
        $('.errorStart').style.color = 'red'
        $('.errorStart').innerHTML = 'Dữ liệu phải lớn hơn 0'
        return
    } else if (cusStart != 0) {
        $('.errorStart').innerHTML = ''
    }

    if (cusEnd == 0) {
        $('.errorEnd').style.color = 'red'
        $('.errorEnd').innerHTML = 'Dữ liệu phải lớn hơn 0'
        return
    } else if (cusEnd != 0) {
        $('.errorEnd').innerHTML = ''
    }


    if (cusStart >= cusEnd) {
        alert('End phải lớn hơn Start!')
        return
    } else {
        arrPerson.push(newPerson)
    }

    if (arrPerson.length > 3) {
        tbl__page.classList.add('open-flex')
        showListPages()
    }
    showPerson()

    var jsonPerson = JSON.stringify(arrPerson)
    localStorage.setItem(storageKeyPerson, jsonPerson)
}

// Clear Form Calculator
cusClear.onclick = function () {
    $('#cusName').value = '';
    $('#cusAddress').value = '';
    $('#cusStart').value = '';
    $('#cusEnd').value = '';
    $('#cusVat').value = '';
    $('.errorStart').innerHTML = '';
    $('.errorEnd').innerHTML = ''
}

// Show Customer in the table
function showPerson() {
    var table = '';

    arrPerson.map((data, stt) => {
        data.stt = stt;
        if (stt >= start && stt < end) {
            table += `<tr>
                <td>${stt + 1}</td>
                <td>${data.name}</td>
                <td>${data.address}</td>
                <td>${data.start}</td>
                <td>${data.end}</td>
                <td>${data.vat}</td>
                <td style="display: flex">
                    <button onclick = "editPerson(${stt})"  style="cursor: pointer; padding: 4px; margin-right: 4px"><i class="fa-sharp fa-solid fa-pen-to-square"></i></button>
                    <button onclick = "delPerson(${stt})"  style="cursor: pointer; padding: 4px"><i class="fa-sharp fa-solid fa-trash"></i></button>
                </td>
        </tr>`
        }
    })
    $('#tbl__customer tbody').innerHTML = table;
}

// Edit Customer
function editPerson(stt) {

    $('#billName').value = arrPerson[stt].name
    $('#billAddress').value = arrPerson[stt].address
    $('#billStart').value = arrPerson[stt].start
    $('#billEnd').value = arrPerson[stt].end
    $('#billVat').value = arrPerson[stt].vat
    $('#stt').value = stt
    form__bill.classList.add('open')
}

// Delete Customer
function delPerson(stt) {

    if (confirm('Bạn có chắc chắn muốn xóa không?')) {
        arrPerson.splice(stt, 1)
    }


    var jsonPeson = JSON.stringify(arrPerson)
    localStorage.setItem(storageKeyPerson, jsonPeson)
    showPerson()
    showListPages()
}

// Update Bill for Customer
billUpdate.onclick = function () {

    var stt = $('#stt').value

    arrPerson[stt] = {
        name: $('#billName').value,
        address: $('#billAddress').value,
        start: $('#billStart').value,
        end: $('#billEnd').value,
        vat: $('#billVat').value
    }

    localStorage.setItem(storageKeyPerson, JSON.stringify(arrPerson))

    form__bill.classList.remove('open')
    showPerson()
}

// Cancle form Bill
billCancle.onclick = function () {
    form__bill.classList.remove('open')
}

// Load Customer in Table
window.onload = function () {
    showPerson()
}


// List Page
var idPages = 3;
var currenPage = 1;
var start = 0;
var end = idPages;
var totalPage = Math.ceil(arrPerson.length / idPages)

// Show List Pages
function showListPages() {
    var list = ''
    list += `<li class="active">${1}</li>`
    for (var i = 2; i <= totalPage; i++) {
        list += `<li>${i}</li>`
    }
    $('.number__page').innerHTML = list
}

// Pages Number
function changePage() {
    // var cPage = $$('.number__page li')

    // for (var i = 0; i < cPage.length; i++) {
    //     cPage[i].addEventListener('click', () => {
    //         console.log(i);
    //     })
    // }
}

// Next Page
btnNext.onclick = function () {
    currenPage++
    if (currenPage > totalPage) {
        currenPage = totalPage
    }
    start = (currenPage - 1) * idPages
    end = currenPage * idPages
    showPerson()
}

// Prev Page
btnPrev.onclick = function () {
    currenPage--
    if (currenPage <= 1) {
        currenPage = 1
    }
    start = (currenPage - 1) * idPages
    end = currenPage * idPages
    showPerson()
}
