$(() => {
    let calc = $('.calc');
    let display = $('.calc .calc-display');
    let btns = $('.calc .calc-btns');
    let initialState = true;

    let displayValue = "0";
    let evalValue = "0";

    let createBtnTemplate = btn => {
        return `
            <div class="btn-wrapper col-` + btn.size + `">
                <div class="btn` + (btn.class !== "" ? (" " + btn.class) : "") + `">` + btn.displayedSymbol + `</div>
            </div>
        `
    };

    const BtnType = Object.freeze({
        InputBtn: 0,
        FuncBtn: 1,
    });

    let buttons = [{
        symbol: "(",
        displayedSymbol: "(",
        size: 2,
        type: BtnType.InputBtn,
        class: "",
        getTemplate: function() { return createBtnTemplate(this) }
    }, {
        symbol: ")",
        displayedSymbol: ")",
        size: 2,
        type: BtnType.InputBtn,
        class: "",
        getTemplate: function() { return createBtnTemplate(this) }
    }, {
        symbol: "C",
        displayedSymbol: "C",
        size: 2,
        type: BtnType.FuncBtn,
        class: "clr",
        getTemplate: function() { return createBtnTemplate(this) },
        func: function(btn) {
            displayValue = "0";
            evalValue = "0";
            initialState = true;
            updateDisplay();
        }
    }, {
        symbol: "&#8592;",
        displayedSymbol: "&#8592;",
        size: 3,
        type: BtnType.FuncBtn,
        class: "back",
        getTemplate: function() { return createBtnTemplate(this) },
        func: function(btn) {
            console.log("Backspace");
        }
    }, {
        symbol: "/",
        displayedSymbol: "/",
        size: 3,
        type: BtnType.InputBtn,
        class: "div",
        getTemplate: function() { return createBtnTemplate(this) }
    }, {
        symbol: "7",
        displayedSymbol: "7",
        size: 3,
        type: BtnType.InputBtn,
        class: "",
        getTemplate: function() { return createBtnTemplate(this) }
    }, {
        symbol: "8",
        displayedSymbol: "8",
        size: 3,
        type: BtnType.InputBtn,
        class: "",
        getTemplate: function() { return createBtnTemplate(this) }
    }, {
        symbol: "9",
        displayedSymbol: "9",
        size: 3,
        type: BtnType.InputBtn,
        class: "",
        getTemplate: function() { return createBtnTemplate(this) }
    }, {
        symbol: "*",
        displayedSymbol: "&#10006;",
        size: 3,
        type: BtnType.InputBtn,
        class: "mul",
        getTemplate: function() { return createBtnTemplate(this) }
    }, {
        symbol: "4",
        displayedSymbol: "4",
        size: 3,
        type: BtnType.InputBtn,
        class: "",
        getTemplate: function() { return createBtnTemplate(this) }
    }, {
        symbol: "5",
        displayedSymbol: "5",
        size: 3,
        type: BtnType.InputBtn,
        class: "",
        getTemplate: function() { return createBtnTemplate(this) }
    }, {
        symbol: "6",
        displayedSymbol: "6",
        size: 3,
        type: BtnType.InputBtn,
        class: "",
        getTemplate: function() { return createBtnTemplate(this) }
    }, {
        symbol: "-",
        displayedSymbol: "-",
        size: 3,
        type: BtnType.InputBtn,
        class: "sub",
        getTemplate: function() { return createBtnTemplate(this) }
    }, {
        symbol: "1",
        displayedSymbol: "1",
        size: 3,
        type: BtnType.InputBtn,
        class: "",
        getTemplate: function() { return createBtnTemplate(this) }
    }, {
        symbol: "2",
        displayedSymbol: "2",
        size: 3,
        type: BtnType.InputBtn,
        class: "",
        getTemplate: function() { return createBtnTemplate(this) }
    }, {
        symbol: "3",
        displayedSymbol: "3",
        size: 3,
        type: BtnType.InputBtn,
        class: "",
        getTemplate: function() { return createBtnTemplate(this) }
    }, {
        symbol: "+",
        displayedSymbol: "+",
        size: 3,
        type: BtnType.InputBtn,
        class: "add",
        getTemplate: function() { return createBtnTemplate(this) }
    }, {
        symbol: "0",
        displayedSymbol: "0",
        size: 6,
        type: BtnType.InputBtn,
        class: "",
        getTemplate: function() { return createBtnTemplate(this) }
    }, {
        symbol: ".",
        displayedSymbol: ".",
        size: 3,
        type: BtnType.InputBtn,
        class: "",
        getTemplate: function() { return createBtnTemplate(this) }
    }, {
        symbol: "=",
        displayedSymbol: "=",
        size: 3,
        type: BtnType.FuncBtn,
        class: "eq",
        getTemplate: function() { return createBtnTemplate(this) },
        func: function(btn) {
            let newValue = "";
            try {
                newValue = new String(eval(evalValue));
            } catch (ex) {
                newValue = "NaN";
            }

            if (newValue.toString() === "undefined") newValue = "NaN";

            if (displayValue !== newValue.toString()) initialState = true;
            displayValue = newValue;
            evalValue = newValue;
            updateDisplay();
        }
    }];

    let insertSymbol = btn => {
        if (btn.symbol !== "0" || evalValue !== "0") {
            if (initialState) {
                displayValue = "";
                evalValue = "";
                initialState = false;
            }

            displayValue += btn.displayedSymbol;
            evalValue += btn.symbol;
        }
        updateDisplay();
    }

    let updateDisplay = () => {
        display.empty();
        display.html(displayValue);
    }

    let updateCalcUI = () => {
        btns.empty();

        let i = 0;
        buttons.forEach(btn => {
            btns.append(btn.getTemplate());
            let btnElement = btns.children().eq(i++).children().eq(0);
            switch (btn.type) {
                case BtnType.InputBtn:
                    {
                        btnElement.on('click', e => insertSymbol(btn));
                        break;
                    }
                case BtnType.FuncBtn:
                    {
                        btnElement.on('click', e => btn.func(btnElement));
                        break;
                    }
            }
        });
    };

    updateCalcUI();
    updateDisplay();
});