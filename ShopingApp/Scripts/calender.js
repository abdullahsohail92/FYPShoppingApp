(function () {
    $.fn.calender = function (data) {
        var Calender = {};
        var self = this;
        Calender.render = function (e, values) {

            var date = document.createElement('div');

            var classList = (values.hasOwnProperty('classList') ? values['classList'] : {});
            var currentDate = new Date();
            var selectedDay = (values.hasOwnProperty('day') ? values['day'] : currentDate.getUTCDate());
            var selectedMonth = (values.hasOwnProperty('month') ? values['month'] : currentDate.getMonth() + 1);
            var selectedYear = (values.hasOwnProperty('year') ? values['year'] : currentDate.getFullYear());
            var selectedType = "kirke";
            var id = (values.hasOwnProperty('id') ? values['id'] : false);


            date.classList.add('date');
            var getDate = Calender.getDate(selectedYear, selectedMonth, selectedDay);

            if (id) {
                date.id = id;
            }
            for (classKey in classList) {
                date.classList.add(classList[classKey]);
            }


            if (e.length > 0) {

                console.log(e[0]);
                return Calender.finish(date);
            }

        };
        Calender.dropdown = function (values) {
            var dropdown = document.createElement('div');
            var optionsDiv = document.createElement('ul');
            var select = document.createElement('div');
            optionsDiv.classList.add('option');
            select.classList.add('select');
            dropdown.classList.add('dropdown');
            var classList = (values.hasOwnProperty('classList') ? values['classList'] : {});
            var id = (values.hasOwnProperty('id') ? values['id'] : false);
            var name = (values.hasOwnProperty('name') ? values['name'] : false);
            var selectValue = (values.hasOwnProperty('select') ? values['select'] : "Välj");
            var selectData = (values.hasOwnProperty('selectData') ? values['selectData'] : false);

            var options = (values.hasOwnProperty('options') ? values['options'] : {});
            var dropdown_month = (values.hasOwnProperty('select') ? values['select'] : "Välj");
            var dropdown_year = (values.hasOwnProperty('select') ? values['select'] : "Välj");
            if (selectValue) {
                select.innerHTML = selectValue;
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

            return dropdown;
        };
        Calender.getDate = function (y, m, d) {
            var currentDate = new Date(y, m - 1, d);
            var monthsStr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
            var daysStr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
            return {
                day: daysStr[currentDate.getDate() - 1],
                month: monthsStr[currentDate.getMonth()],
                year: currentDate.getFullYear()
            }
        };
        Calender.setDays = function (e, y, m, d, t) {
            console.log('e:' + e + 'y:' + y + 'm:' + m + 'd:' + d + 't:' + t);
            var ul = document.createElement('ul');
            if (e.childNodes.length > 0) {
                e.removeChild(e.childNodes[0]);
            }
            var getDate = Calender.getDate(y, m, d);
            var daysInMonth = new Date(y, m, 0).getDate();
            var prevDaysInMonth = new Date(y, m - 1, 0).getDate();
            var weekDay = new Date(y + "-" + getDate.month + "-01").getDay() - 1;
            var lastWeekDay = new Date(y + "-" + getDate.month + "-" + daysInMonth).getDay();


            if (weekDay < 0) {
                weekDay = 6;
            }
            var calcprevday = prevDaysInMonth - weekDay;

            for (var w = 1; w <= weekDay; w++) {
                var li = document.createElement("li");
                li.innerHTML = calcprevday + w;
                li.setAttribute('data', calcprevday + w);
                li.classList.add('prev-day');

                ul.appendChild(li);
            }
            for (var day = 1; day <= daysInMonth; day++) {
                var li = document.createElement("li");
                var span = document.createElement("span");
                span.classList.add('currentday');
                span.innerHTML = day;
                li.appendChild(span);
                if (day <= 9) {
                    day = "0" + day;
                }
                li.setAttribute('data', day);
                li.classList.add('day');
                if (d == day) {

                    li.setAttribute("selected", "");
                }
                ul.appendChild(li);
            }
            if (ul.childNodes.length < d) {
                ul.lastChild.setAttribute("selected", "");
            }

            var calcLastpay = 7 - lastWeekDay;
            if (calcLastpay < 7) {
                for (var nw = 1; nw <= calcLastpay; nw++) {
                    var li = document.createElement("li");
                    li.innerHTML = nw;
                    li.setAttribute('data', nw);
                    li.classList.add('next-day');
                    ul.appendChild(li);
                }
            }
            e.appendChild(ul);
            $(e).find('li.day').click(function (e) {
                var onchange = (Calender.data.hasOwnProperty('onchange') ? Calender.data['onchange'] : function (e) { });
                $(ul).find('li').removeAttr("selected");
                this.setAttribute("selected", "");

                onchange(Calender.getDate(y, m, $(this).attr('data')));

            });
            var viewActivities = (Calender.data.hasOwnProperty('view_activities') ? Calender.data['view_activities'] : false);
            if (viewActivities) {
                Calender.setActivities(e, d, m, y, t);

            }



        };
        Calender.setActivities = function (e, d, m, y, t) {

            $.getJSON("/Activites/JsonActivities?m=" + m + "&y=" + y + '&t=' + t, function (data) {

                var days = $(e).find('.day');
                for (activity in data) {
                    var getActivity = data[activity];
                    var theDate = getActivity.StartDate;
                    var getDate = new Date(theDate);
                    var d = getDate.getUTCDate();

                    var activities = [];
                    if (d < 10) {
                        d = "0" + d;
                    }

                    if (getActivity.hasOwnProperty('Name')) {

                        var day = $(e).find('.day[data=' + d + ']')[0];
                        var a = document.createElement('a');


                        a.onclick = function () {
                            //var aId = getActivity.Name + getActivity.ID;
                            //a.setAttribute("id", aId);

                            //var id = getActivity.ID.html(data[this.id]);
                            //var name = getActivity.Name.html(data[this.id]);
                            //var desc = getActivity.Desscription;
                            //var sd = getActivity.StartDate;
                            //var ed = getActivity.EndDate;
                          //  var sid = getActivity.SID;
                            var type = getActivity.Type;
                          //  var order = getActivity.order_number;
                            var name = $('.activity-holder').find("#Name").html(data[this.id]['Name']).text();
                            var id = $('.activity-holder').find("#ID").html(data[this.id]['ID']).text();
                            var desc = $('.activity-holder').find("#Desscription").html(data[this.id]['Desscription']).text();
                            //start date
                            var sd = $('.activity-holder').find("#StartDate").html(data[this.id]['StartDate']).text();
                            //format start date
                            sd = new Date(sd);
                            if (sd.getMonth() < 10) {
                                var mont = "0" + (sd.getMonth()+1);
                            } else {
                                mont = sd.getMonth();
                            }
                            if (sd.getDay() < 10) {
                                var dd = "0" + (sd.getDay()-2);
                            }
                            else {
                                dd = sd.getDay();
                            }
                            sd = sd.getFullYear() + "-" + mont + "-" + dd;
                            //end date
                            var ed = $('.activity-holder').find("#EndDate").html(data[this.id]['EndDate']).text();
                            //format end date
                            ed = new Date(ed);
                            if (ed.getMonth() < 10) {
                                var emont = "0" + (ed.getMonth()+1);
                            } else {
                                emont = ed.getMonth();
                            }
                            if (ed.getDay() < 10) {
                                var edd = "0" + (ed.getDay()-2);
                            }
                            else {
                                edd = ed.getDay();
                            }
                            ed = ed.getFullYear() + "-" + emont + "-" + edd;


                            $("#btn").click();
                            $("#ID").val(id);
                            $("#Name").val(name);
                            $("#Desscription").val(desc);
                            $("#StartDate").val(sd);
                            $("#EndDate").val(ed);
                            //$("#SID").val(sid);
                            $("#Type").val(type);
                           // $("#order_number").val(order);

                            $("#order").show();
                            //disable textboxes
                            $("#Name").attr("disabled", "disabled");
                            $("#Desscription").attr("disabled", "disabled");
                            $("#StartDate").attr("disabled", "disabled");
                            $("#EndDate").attr("disabled", "disabled");
                            $("#SID").attr("disabled", "disabled");
                            $("#Type").attr("disabled", "disabled");
                            $("#order_number").attr("disabled", "disabled");
                            //remove borders
                            $("#Name").removeAttr("class").css("border", "0px");
                            $("#Desscription").removeAttr("class").css("border", "0px");
                            $("#StartDate").removeAttr("class").css("border", "0px");
                            $("#EndDate").removeAttr("class").css("border", "0px");
                            $("#SID").removeAttr("class").css("border", "0px");
                            $("#Type").removeAttr("class").css("border", "0px");
                            $("#order_number").removeAttr("class").css("border", "0px");
                        }
                        a.classList.add('status');
                        if (getActivity['Status'] == 'completed') {
                            a.classList.add('completed');
                        }
                        if (getActivity['Status'] == 'fallen') {
                            a.classList.add('fallen');
                        }
                        if (getActivity['Status'] == 'pending') {
                            a.classList.add('pending');
                        }

                        a.innerHTML = getActivity['Name'];
                        a.id = activity;
                        console.log(data[this.id]);
                        a.innerHTML = "<b style='font-size:15px;'>" + getActivity['Name'] + "</b><br/><span> " + getActivity['Desscription'] + "</span>";
                        if (getActivity['Type'] == "1") {

                            $('.activity-holder').find("#order").attr("href", "/" + $("#siteURL").val() + "/Order/Inheritance_Index/" + getActivity['order_number']);
                            a.classList.add('kirke');

                        }
                        if (getActivity['Type'] == "2") {
                            $('.activity-holder').find("#order").attr("href", "/" + $("#siteURL").val() + "/Order/Inheritance_Index/" + getActivity['order_number']);
                            a.classList.add('barehenting');
                        }
                        day.appendChild(a);

                    } else {
                        for (activities in getActivity) {
                            var getActivities = getActivity[activities];
                            var day = $(e).find('.day[data=' + d + ']')[0];
                            var a = document.createElement('a');
                            a.classList.add('Status');
                            if (getActivities['Status'] == 'completed') {
                                a.classList.add('completed');
                            }
                            if (getActivities['Status'] == 'fallen') {
                                a.classList.add('fallen');
                            }
                            if (getActivities['Status'] == 'pending') {
                                a.classList.add('pending');
                            }
                            a.innerHTML = getActivities['Name'];
                            day.appendChild(a);
                        }
                    }
                }
            });


        };
        Calender.finish = function (e) {

            var values = Calender.data;
            var select = document.createElement('div');
            var selectTitle = document.createElement('span');
            var title = (values.hasOwnProperty('title') ? values['title'] : 'Calender');
            var show_type = (values.hasOwnProperty('show_type') ? values['show_type'] : false);
            var selectType = (values.hasOwnProperty('select_type') ? values['show_type'] : false);
            var top = document.createElement('div');
            var days = document.createElement('div');
            var week = document.createElement('div');
            var currentDate = new Date();
            var selectedDay = (values.hasOwnProperty('day') ? values['day'] : currentDate.getUTCDate());
            var selectedMonth = (values.hasOwnProperty('month') ? values['month'] : currentDate.getMonth() + 1);
            var selectedYear = (values.hasOwnProperty('year') ? values['year'] : currentDate.getFullYear());
            var shortDays = (values.hasOwnProperty('short_days') ? values['short_days'] : false);
            var hideWeek = (values.hasOwnProperty('hide_week') ? values['hide_week'] : false);
            var hideTitle = (values.hasOwnProperty('hide_title') ? values['hide_title'] : false);
            var dropdown_month = (values.hasOwnProperty('select_month') ? values['select_month'] : 'Velg m&aring;ned');
            var dropdown_year = (values.hasOwnProperty('select_year') ? values['select_year'] : 'Velg &aring;r');
            var onchange = (values.hasOwnProperty('onchange') ? values['onchange'] : function (e) { });
            var selectedType = 'kirke';
            Calender.setDays(days, selectedYear, selectedMonth, selectedDay, '1');//we can write kirke instead of 1 to pass json parameter t=kirke
            top.classList.add('top');
            days.classList.add('days');
            select.classList.add('select');
            select.appendChild(selectTitle);
            selectTitle.innerHTML = title;
            if (!hideWeek) {
                week.classList.add('week');
                var weekDays = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'L&oslash;rdag', 'S&oslash;ndag'];
                var weekDays_short = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'L&oslash;r', 'S&oslash;n'];
                var ul = document.createElement('ul');
                for (w in weekDays) {
                    var li = document.createElement('li');
                    if (shortDays) {
                        li.innerHTML = weekDays_short[w];
                    } else {
                        li.innerHTML = weekDays[w];
                    }

                    ul.appendChild(li);
                }
                week.appendChild(ul);
            }


            var month = [{
                'value': '01',
                'text': 'Januar'
            }, {
                'value': '02',
                'text': 'Februar'
            }, {
                'value': '03',
                'text': 'Mars'
            }, {
                'value': '04',
                'text': 'April'
            }, {
                'value': '05',
                'text': 'Mai'
            }, {
                'value': '06',
                'text': 'Juni'
            }, {
                'value': '07',
                'text': 'Juli'
            }, {
                'value': '08',
                'text': 'August'
            }, {
                'value': '09',
                'text': 'Septemper'
            }, {
                'value': '10',
                'text': 'Oktober'
            }, {
                'value': '11',
                'text': 'November'
            }, {
                'value': '12',
                'text': 'Desember'
            }];
            var year = [];
            var maxYears = 50;
            for (var y = 0; y < maxYears; y++) {
                var yo = {};
                yo['value'] = currentDate.getFullYear() - y;
                yo['text'] = currentDate.getFullYear() - y;
                year.push(yo);
            }

            var dropMonth,
                dropYear;
            if (selectType) {
                top.appendChild(types = Calender.dropdown({
                    'classList': ['select-date'],
                    'select': 'Velg type',
                    'selectData': 'kirke',
                    'name': 'type',
                    'options': [{
                        'value': '1',
                        'text': 'Kirke'
                    }, { 'value': '2', 'text': 'Bårehenting' }]
                }));
            }

            top.appendChild(dropMonth = Calender.dropdown({
                'classList': ['select-date'],
                'select': dropdown_month,
                'selectData': selectedMonth,
                'name': 'month',
                'options': month
            }));

            top.appendChild(dropYear = Calender.dropdown({
                'classList': ['select-date'],
                'select': dropdown_year,
                'selectData': selectedYear,
                'name': 'year',
                'options': year
            }));
            if (e) {
                if (!hideTitle) {
                    e.appendChild(select);
                }
                e.appendChild(top);

                e.appendChild(week);

                e.appendChild(week);
                e.appendChild(days);
                $(self).append(e);
            }

            if (selectType) {
                $(types).click(function (e) {
                    $(this).toggleClass('active');
                });
            }

            $(dropMonth).click(function (e) {
                $(this).toggleClass('active');
            });

            $(dropYear).click(function (e) {
                $(this).toggleClass('active');
            });

            $(dropMonth).find('li').click(function (e) {
                selectedDay = $(days).find('li[selected]').attr('data');

                var item = $(this);
                var select = $(this).parent().parent().find('.select');
                select.attr('data', item.attr('data'));
                select.html(item.html());
                Calender.setDays(days, selectedYear, item.attr('data'), selectedDay, selectedType);
                selectedMonth = item.attr('data');

                onchange(Calender.getDate(selectedYear, selectedMonth, selectedDay));
            });

            $(dropYear).find('li').click(function (e) {
                selectedDay = $(days).find('li[selected]').attr('data');
                var item = $(this);
                var select = $(this).parent().parent().find('.select');
                select.attr('data', item.attr('data'));
                select.html(item.html());
                Calender.setDays(days, item.attr('data'), selectedMonth, selectedDay, selectedType);
                selectedYear = item.attr('data');
                var setmonth = selectedMonth;
                if (setmonth <= 9) {
                    setmonth = "0" + selectedMonth;
                }
                onchange(Calender.getDate(selectedYear, selectedMonth, selectedDay));
            });
            if (selectType) {
                $(types).find('li').click(function (e) {
                    selectedDay = $(days).find('li[selected]').attr('data');
                    var item = $(this);
                    var select = $(this).parent().parent().find('.select');
                    select.attr('data', item.attr('data'));
                    select.html(item.html());
                    Calender.setDays(days, selectedYear, selectedMonth, selectedDay, item.attr('data'));
                    selectedType = item.attr('data');
                    onchange(Calender.getDate(selectedYear, selectedMonth, selectedDay));
                });
            }


        }

        Calender.data = data;
        Calender.render(this, data);
    };

    $.fn.datepicker = function (data) {
        var currentDate = new Date();
        var datepicker = $(this);
        datepicker.each(function (e) {
            var datepickerSelected = $(this);
            var month = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'Septemper', 'Oktober', 'November', 'Desember'];
            datepickerSelected.calender({
                'classList': ['basic', 'small', 'calenderdatepicker'],
                'select_month': month[currentDate.getMonth()],
                'select_year': currentDate.getFullYear(),
                'title': '',
                'short_days': true,
                'hide_title': true,
                'onchange': function (date) {
                    datepickerSelected.find('input').val(date.year + '-' + date.month + '-' + date.day);
                }
            });
            datepickerSelected.find('.date').css({ 'opicty': 0, 'visibility': 'hidden', 'position': 'absolute', 'z-index': '20' });

            $(this).find('input').click(function () {
                $(this).css({
                    'border-bottom-left-radius': 0,
                    'border-bottom-right-radius': 0
                });
                $(datepickerSelected).find('.date').css({ 'opicty': 1, 'visibility': 'visible' });
            });
        });

    };
})();


$(window).load(function () {
    $("#calender").calender({
        'classList': ['basic'],
        'id': 'date',
        'title': 'Aktiviteter',
        'view_activities': true,
        'show_type': true,
        'select_type': true
    });

    $("#staff-calender").calender({
        'classList': ['basic', 'staff'],
        'id': 'staff-clnd',
        'title': 'Ansatte kalender',
        'short_days': true
    });
    $("#register-date").calender({
        'classList': ['basic', 'register'],
        'id': 'staff-clnd',
        'title': 'Date: 01 01 2000',
        'short_days': true,
        'hide_week': true
    });
    $("#register-date .date > .select:first-child").click(function () {
        $("#register-date .date").toggleClass('active');
    });
    $('.datepicker').datepicker();
});
