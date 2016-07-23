
$(window).load(function (e) {
    $('.user-section').click(function (e) {
        $('.user-section .user-menu').toggleClass('open');
    });
    $(document).click(function (e) {

        if (!$('.user-section')[0].contains(e.target)) {
            $('.user-section .user-menu').removeClass('open');
        }
        if (!$('.search-section')[0].contains(e.target)) {
            $('.search-section .result').removeClass('open');
            $('.search-section').removeClass('open');
        }
        if ($('.search-list').length) {
            if (!$('.search-list')[0].contains(e.target)) {
                $('.search-list .result').removeClass('open');
                $('.search-list').removeClass('open');
            }

        }
        $('.datepicker').each(function () {
            var self = $(this);

            if (!self[0].contains(e.target)) {
                if (self.parent().is(':visible')) {
                    self.find('.date').css({ 'opicty': 0, 'visibility': 'hidden' });
                    self.find('input').css({
                        'border-bottom-left-radius': 4,
                        'border-bottom-right-radius': 4
                    });
                }

            }
        });
    });
    $(".tabs .top").click(function (e) {
        $(this).parent().toggleClass('active');
    });

    $(".tabs .current-tab").click(function () {
        $(this).parent().toggleClass('open');
    });

    $('.search-field').search({
        minLength: 3, //fake data
        url: '../js/search/data.json',
        result: '/search'
    });

    $('#staff-search').search({
        minLength: 3, //fake data
        url: '../js/search/data.json',
        result: '/hr.aspx'
    });
    $('#customer-search').search({
        minLength: 3, //fake data
        url: '../js/search/data.json',
        result: '/customers.aspx'
    });
    $('#deceased-search').search({
        minLength: 3, //fake data
        url: '../js/search/data.json',
        result: '/deceased.aspx'
    });
    $('.search-section').click(function (e) {
        $(this).addClass('open');
    });
    $('.search-list').click(function (e) {
        $(this).addClass('open');
    });

    $('.toggler').toggler({
        'classList': ['basic']
    });
    $('.amount').amount();



    $('.left-menu .menu-toggler').click(function (e) {
        $(this).toggleClass('close');
        $('.left-menu .menu ul li a').toggleClass('close');
        $('.left-menu').toggleClass('close');
        $('.content').toggleClass('close');
        if ($('.left-menu').hasClass('close')) {
            toggleMenu('hide');
        } else {
            toggleMenu('show');
        }
    });
    $(".bt-create").click(function (e) {
        $('.activity-holder').toggleClass('open');
    });
    $(".activity-holder .close-activity").click(function (e) {
        $('.activity-holder').toggleClass('open');
    });
    $(".product-item .specifications .spec-tabs .spec-tab").click(function (e) {
        $(".product-item .specifications .spec-tabs .spec-tab").removeClass('current');
        $(this).addClass("current");
        var index = $(this).index();
        var child = $('.product-item .specifications .spec-content').children();
        $(child).removeClass('open');
        $(child[index]).addClass('open');
    });
    var enable_heirs = $('#enable-heirs');
    if (enable_heirs.length == 1) {
        enable_heirs.toggler({
            'classList': ['basic'],
            'onchange': function (e) {
                var val = enable_heirs.val();
                var tb0 = $('#content_TetBox0');
                var tb1 = $('#content_TetBox1');
                var tb2 = $('#content_TetBox2');
                var tb3 = $('#content_TetBox3');
                var db1 = $('#content_DropDownList1');
                var tb6 = $('#content_TetBox6');
                var tb7 = $('#content_TetBox7');
                var tb8 = $('#content_TetBox8');
                if (val == 'false') {
                    tb0.prop('disabled', true);
                    tb1.prop('disabled', true);
                    tb2.prop('disabled', true);
                    tb3.prop('disabled', true);
                    db1.prop('disabled', true);
                    tb6.prop('disabled', true);
                    tb7.prop('disabled', true);
                    tb8.prop('disabled', true);

                } else {
                    tb0.prop('disabled', false);
                    tb1.prop('disabled', false);
                    tb2.prop('disabled', false);
                    tb3.prop('disabled', false);
                    db1.prop('disabled', false);
                    tb6.prop('disabled', false);
                    tb7.prop('disabled', false);
                    tb8.prop('disabled', false);

                }
            }
        });
        heirs_value = enable_heirs.val();

    }
    var invoices = $('#orders');
    if (invoices.length == 1) {
        console.log('here');
        var invoice_item = $('#invoices .item.pointer');
        var invoice_item_open = $('#invoices .item.pointer.open');
        var invoice_details = $('#invoices .item.pointer .invoice-details');

        invoice_item.find('.col-5').click(function () {

            invoice_item.removeClass('open');
            invoice_details.find('.inner').height(0);
            $(this).parent().toggleClass('open');
            if (invoice_item.hasClass('open')) {
                var height = $(this).parent().find('.inner-content').innerHeight();
                $(this).parent().find('.inner').height(height + 60);
            }


        });

    }
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
        console.log(document.cookie);
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1);
            if (c.indexOf(name) == 0)
                return c.substring(name.length, c.length);
        }
        return "";
    }
    function checkCookie(cookie) {
        var getcookie = getCookie(cookie);
        if (getcookie != "") {
            return true;
        } else {
            return false;
        }
    }
    function toggleMenu(toggle) {
        if (toggle == 'hide') {
            if (typeof (Storage) !== "undefined") {
                sessionStorage.setItem('menu-toggled', 'true');
                console.log(sessionStorage.getItem('menu-toggled'));
            } else {
                // Sorry! No Web Storage support..
                toastr.error('Sorry! No Web Storage support available in the current browser version');
            }
        }
        if (toggle == 'show') {
            sessionStorage.setItem('menu-toggled', 'false');
            console.log(sessionStorage.getItem('menu-toggled'));
        }
    }

});

$.fn.dropdown = function (values) {
    var dropdown = document.createElement('div');
    var optionsDiv = document.createElement('ul');
    var select = document.createElement('div');
    var span = document.createElement('span');
    optionsDiv.classList.add('option');
    select.classList.add('select');
    dropdown.classList.add('dropdown');
    var classList = (values.hasOwnProperty('classList') ? values['classList'] : {});
    var id = (values.hasOwnProperty('id') ? values['id'] : false);
    var name = (values.hasOwnProperty('name') ? values['name'] : false);
    var selectValue = (values.hasOwnProperty('select') ? values['select'] : "Välj");
    var selectData = (values.hasOwnProperty('selectData') ? values['selectData'] : false);
    var options = (values.hasOwnProperty('options') ? values['options'] : {});

    select.appendChild(span);
    if (selectValue) {
        span.innerHTML = selectValue;
    }
    if (selectData) {
        select.setAttribute("data", selectData);
    }
    if (id) {
        dropdown.id = id;
    }
    if (name) {
        dropdown.setAttribute('name', name);
    }

    for (classKey in classList) {
        dropdown.classList.add(classList[classKey]);
    }
    for (opt in options) {
        var value = options[opt]['value'];
        var text = options[opt]['text'];
        var option = document.createElement("li");
        option.innerHTML = text;
        option.setAttribute('data', value);
        optionsDiv.appendChild(option);
    }
    dropdown.appendChild(select);
    dropdown.appendChild(optionsDiv);
    this[0].appendChild(dropdown);
    $(dropdown).find('li').click(function (e) {
        var item = $(this);
        var select = $(this).parent().parent().find('.select span');
        select.attr('data', item.attr('data'));
        select.html(item.html());
    });
    $(dropdown).click(function (e) {
        $(this).toggleClass('active');
    });
    return dropdown;
};

$.fn.toggler = function (values) {
    var toggle = document.createElement('div');
    var classList = (values.hasOwnProperty('classList') ? values['classList'] : {});
    var id = (values.hasOwnProperty('id') ? values['id'] : false);
    var onchange = (values.hasOwnProperty('onchange') ? values['onchange'] : function () { });
    var indicator = document.createElement('div');
    toggle.classList.add('toggle');
    indicator.classList.add('indicator');
    if (id) {
        toggle.id = id;
    }

    for (classKey in classList) {
        toggle.classList.add(classList[classKey]);
    }

    toggle.appendChild(indicator);
    var self = $(this);
    if (self.length > 0) {
        $(self).append(toggle);
        if (self.val() == 'true') {
            $(toggle).addClass('active');
        }
        self.find('.toggle').each(function () {
            if ($(this).prev().val() && $(this).prev().val().toLowerCase() === 'true') {
                $(this).addClass('active');
            }

            $(this).on('click', function (e) {
                $(this).toggleClass('active');
                var getval = ($(this).prev().val() === 'false' || $(this).prev().val() === '' ? 'true' : 'false');
                $(this).prev().val(getval);
                onchange(e);
            });
        });
    }

};

$.fn.amount = function (values) {
    var self = $(this);
    if (self.length > 0) {
        self.each(function () {
            var up = $(this).find('.up');
            var down = $(this).find('.down');
            var input = $(this).find('input');
            up.click(function (e) {
                var currentValue = input.val();
                currentValue++;
                input.val(currentValue);
            });
            down.click(function (e) {
                var currentValue = input.val();
                if (currentValue > 0) {
                    currentValue--;
                }
                input.val(currentValue);
            });
        });

    }

    $.fn.addRow = function (index, description_val, price_val, amount_val, unit_val, discount_val, vat_val, articleId, unitId, articleNumber, articleInvoiceId, invoiceId) {
        var self = $(this);
        var row = document.createElement('DIV');
        row.id = "productId_" + index;
        var drag = document.createElement('DIV');
        var description = document.createElement('DIV');
        var amount = document.createElement('DIV');
        var unit = document.createElement('DIV');
        var price = document.createElement('DIV');
        var total = document.createElement('DIV');

        var aId = document.createElement('DIV');
        var uId = document.createElement('DIV');
        var aInvoiceId = document.createElement('DIV');
        var invoicId = document.createElement('DIV');
        var ul = document.createElement('UL');
        for (var i = 0; i < 3; i++) {
            var li = document.createElement('LI');

            $(ul).append(li);
        }

        $(drag).addClass('drag');
        $(drag).append(ul);
        $(row).addClass('item');
        $(row).append(drag);


        var article = document.createElement('DIV');
        $(article).addClass('col-7');
        $(article).addClass('caret');
        $(article).css({ 'width': 100 });

        var input = document.createElement('input');
        input.type = 'text';
        input.value = parseInt(articleNumber) > 0 ? parseInt(articleNumber) : "";
        input.value > 0 ? input.readOnly = true : input.readOnly = false;
        input.id = "ANumer";

        $(article).append(input);
        var articleSearch = document.createElement('i');
        articleSearch.className = "fa fa-search articleTextboxSearchIcon";
        $(article).append(articleSearch);
        $(row).append(article);


        var description = document.createElement('DIV');
        $(description).addClass('col-7');
        var input = document.createElement('input');
        input.type = 'text';
        input.value = description_val;
        $(description).append(input);
        $(row).append(description);

        var amount = document.createElement('DIV');
        $(amount).addClass('col-7');
        $(amount).css({ 'width': 60, 'min-width': 60 })
        var input = document.createElement('input');
        input.type = 'text';
        input.value = amount_val;
        $(amount).append(input);
        $(row).append(amount);

        var unit = document.createElement('DIV');
        $(unit).addClass('col-7');
        var input = document.createElement('input');
        input.type = "text";
        input.value = unit_val;
        $(unit).append(input);
        $(unit).css({ 'width': 60, 'min-width': 60 })
        $(row).append(unit);

        var price = document.createElement('DIV');
        $(price).addClass('col-7');
        var input = document.createElement('input');
        input.type = 'text';
        input.value = price_val;
        $(input).css({ 'text-align': 'right' });
        $(price).append(input);
        $(row).append(price);
        var vat = document.createElement('input');
        vat.type = "hidden";
        $(vat).attr('data', 'vat');
        var discount = document.createElement('DIV');
        $(discount).addClass('col-7');
        var input = document.createElement('input');
        input.type = 'text';
        $(input).css({ 'text-align': 'right' });
        $(input).val(discount_val + '%');
        $(discount).append(input);
        $(discount).css({ 'width': 60, 'min-width': 60 })
        $(row).append(discount);

        var total = document.createElement('DIV');
        $(total).addClass('col-7');
        var span = document.createElement('SPAN');
        span.innerHTML = 0;
        $(span).attr('data', 'total');
        $(span).addClass('text');
        $(total).css({ 'text-align': 'right' });
        $(total).append(span);
        $(row).append(total);
        ////Hidden fields
        var input = document.createElement('input');
        input.type = 'hidden';
        $(input).css({ 'text-align': 'right' });
        $(input).val(articleId);
        $(aId).append(input);
        $(aId).css({ 'width': 60, 'min-width': 60 });
        $(row).append(aId);

        var input = document.createElement('input');
        input.type = 'hidden';
        $(input).css({ 'text-align': 'right' });
        $(input).val(unitId);
        $(uId).append(input);
        $(uId).css({ 'width': 60, 'min-width': 60 });
        $(row).append(uId);

        var input = document.createElement('input');
        input.type = 'hidden';
        $(input).css({ 'text-align': 'right' });
        $(input).val(articleInvoiceId);
        $(aInvoiceId).append(input);
        $(aInvoiceId).css({ 'width': 60, 'min-width': 60 });
        $(row).append(aInvoiceId);
        var input = document.createElement('input');
        input.type = 'hidden';
        $(input).css({ 'text-align': 'right' });
        $(input).val(invoiceId);
        $(invoicId).append(input);
        $(invoicId).css({ 'width': 60, 'min-width': 60 });
        $(row).append(invoicId);
        ///
        var addremove = document.createElement('DIV');
        $(addremove).addClass('addremove');
        var add_bt = document.createElement('span');
        var remove_bt = document.createElement('span');
        $(add_bt).addClass('add');
        $(remove_bt).addClass('remove');
        $(addremove).append(add_bt);
        $(addremove).append(remove_bt);
        $(row).append(addremove);


        $(add_bt).click(function () {

            var currentIndex = self.children().index($(this).parent().parent());


            counter = 0;


            self.addRow(currentIndex, '', 0, 1, '', 0, 0.25);

            $(self).find('[id^="productId_"]').each(function () {

                this.id = "productId_" + counter++;

            });

            count();


        });
        $(remove_bt).click(function () {

            $(this).parent().parent().remove();
            //
            if (counter == 0) {
                counter = counter + 1;
            }
            counter = counter - 1;
            //if (self.find('.item').length < 2) {
            //    self.addRow(0, '', 0, 1, '', 0, 0.25);
            //}
            count();
            self.totalPrice();
        });
        var count = function () {
            var get_amount = $(amount).find('input').val();
            var get_price = $(price).find('input').val();
            var get_discount = $(discount).find('input').val();
            if (get_discount.indexOf('%') <= 0) {
                var get_discount_int = parseFloat(get_discount) / 100;
                $(discount).find('input').val(get_discount + "%");
            } else {
                var get_discount_int = parseFloat(get_discount.replace(/\%?/g, "")) / 100;
            }


            var calc_price = (get_amount * get_price) - (get_amount * get_price) * get_discount_int;
            $(total).find('span').html(calc_price);
            $(vat).val(calc_price * vat_val);
            $(price).append(vat);

            self.totalPrice();
        };
        count();
        $(amount).find('input').focusout(function () {
            count();
        });
        $(price).find('input').focusout(function () {
            count();
        });
        $(discount).find('input').focusout(function () {
            count();
        });
        $(self.children()[index]).after(row);

    };
    $.fn.totalPrice = function () {
        var total_price = 0;
        var total_vat = 0;
        $(this).find('[data="total"]').each(function () {
            total_price += parseFloat($(this).html());
            total_price = parseFloat(total_price.toFixed(2));
        });
        $('#total_sum').html(total_price);
        $(this).find('[data="vat"]').each(function () {
            total_vat += parseFloat($(this).val());
            total_vat = parseFloat(total_vat.toFixed(2));
        });
        $('#total_vat').html(total_vat);
        var total = parseFloat(total_price + total_vat);
        total = parseFloat(total.toFixed(2));
        $('#total_price').html(total);
    };
    $('#add_product').totalPrice();
    $('#add_product').sortable({
        handle: '.drag',
        cursor: 'move',
        axis: 'y',
        stop: function () {
            var i = 0;
            $("#add_product").find('[id^="productId_"]').each(function () {
                this.id = "productId_" + i++;
            });
        }
    });
    //var i = 0;
    //$("#add_product").sortable({
    //    stop: function () {
    //        $("#add_product").find('[id^="productId_"]').each(function () {
    //            this.id = "productId_" +i;
    //        });
    //    }
    //});
};

$(document).ready(function () {
    if (sessionStorage.getItem('menu-toggled') === 'true') {

        $('.left-menu').addClass('close');
        $('.content').addClass('close');
        $('.menu-toggler').removeClass('close');
    }
    else if (sessionStorage.getItem('menu-toggled') === 'false') {
        $('.left-menu').removeClass('close');
        $('.content').removeClass('close');
        $('.menu-toggler').addClass('close');
    }



});

