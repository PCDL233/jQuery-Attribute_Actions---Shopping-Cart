$(function () {
    //1.全选模块
    //将全选按钮（checkall）的状态赋值给三个小的按钮（j-checkbox）
    $(".checkall").change(function () {
        var all = $(this).prop("checked");                 //获取checkall的状态
        $(".j-checkbox, .checkall").prop("checked", all);  //赋值给小的按钮
    })

    //2.当所有的小复选框都选中时全选按钮要选中
    $(".j-checkbox").change(function () {
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            // $(".j-checkbox").change--->这个是所有的小复选框的个数
            $(".checkall").prop("checked", true);
        }
        else {
            $(".checkall").prop("checked", false);
        }
    });

    //3.增减商品数量模块
    //加
    $(".increment").click(function () {
        var num = $(this).siblings(".itxt").val();
        num++;
        $(this).siblings(".itxt").val(num);

        //修改商品总价格
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        console.log(p);
        //小计模块
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * num).toFixed(2));
        getSum();
    });
    //减
    $(".decrement").click(function () {
        var num = $(this).siblings(".itxt").val();
        if (num == 1) {
            return false;
        }
        num--;
        $(this).siblings(".itxt").val(num);

        //修改商品总价格
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        console.log(p);

        //toFixed(保留的位数)--->toFixed(2)保留两位小数
        var price = (p * num).toFixed(2);
        //小计模块
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    });

    //4.用户修改文本框的值 计算 总的价格模块
    $(".itxt").change(function () {
        //先得到文本框里面的值
        var n = $(this).val();
        //当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        //文本框里面的值 乘 单价
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });

    //5.计算商品总计和总额模块
    getSum();//首次打开，调用函数
    function getSum() {
        var count = 0;//计算总件数
        var money = 0;//计算总价格
        $(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        $(".p-sum").each(function (i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }

})