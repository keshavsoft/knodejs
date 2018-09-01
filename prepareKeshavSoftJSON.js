function jFPrepareJSON() {
    return { Head: [], Grid1: [], Grid1Columns: [], Grid1Data: [], Grid1HeadButtons: [], Grid2: [], Grid2Columns: [], Grid2Data: [], Grid2HeadButtons: [], Options: [], Navigation: [] };
}

function jFJSONImport() {
    //console.log("i2",inJVarKThis);
    jVarGlobalBreadcrumbId.innerHTML = "";
    jVarGlobalXHTTP.jFXHTTPGetJSON({
        inJVarURL: '/api/JSON/KeshavSoft', callback: function (jVarData, jVarError) {
            jVarGlobalPresentViewData = JSON.parse(jVarData);
            jFPrepareData(jVarGlobalPresentViewData);
        }
    })
}

function jFJSONLevel1Import(inJVarFolder) {
    let jVarLocalData;
    let jVarLocalData1 = "";
    console.log('inJVarFolder', inJVarFolder)
    jVarGlobalBreadcrumbId.appendChild(jFInsertDOM('li', inJVarFolder.inJVarQueryName, 'breadcrumb-item  Elementclass', '', '', ''))

    document.querySelectorAll('.Elementclass').forEach(j => {
        console.log(j)
        if (jVarLocalData1 !== "") {
            jVarLocalData1 += "." + j.innerHTML;
        }
        else {
            jVarLocalData1 = j.innerHTML;
        }
    })
    console.log(jVarLocalData1)
    jVarGlobalXHTTP.jFXHTTPGetJSON({
        inJVarURL: '/api/JSON/Level1/' + jVarLocalData1, callback: function (jVarData, jVarError) {
            jVarLocalData = JSON.parse(jVarData);
            jFPrepareData(jVarLocalData)
        }
    })
}

function jFPrepareData(inJVarData) {
    let jVarLocalArray;
    let jVarLocalKeshavSoftJSON = jFPrepareJSON();

    jVarLocalKeshavSoftJSON.Grid1Columns = [];

    jVarLocalKeshavSoftJSON.Grid1Data = inJVarData.Files;
    jVarLocalKeshavSoftJSON.Navigation = inJVarData.Folders;

    jVarLocalArray = jVarLocalKeshavSoftJSON.Grid1Data.map(jVarLoopItem => { return [jVarLoopItem] })

    if (jVarLocalKeshavSoftJSON.Grid1Data.length > 0) {

        jVarLocalKeshavSoftJSON.Grid1Columns.push({ ColumnName: "", DataAttribute: "FileName", DisplayMode: "", DisplayName: "FileName", SNo: "", ShowBalance: "", ShowTotal: "", TextAlign: "", Width: "", ViewType: "" });
        jVarLocalKeshavSoftJSON.Grid1Columns.push({ ColumnName: "", DataAttribute: "CheckBox", DisplayMode: "", DisplayName: "Consider", SNo: "", ShowBalance: "", ShowTotal: "", TextAlign: "", Width: "", ViewType: "CheckBox" });

        jVarLocalKeshavSoftJSON.Grid1Data = jVarLocalArray;
    }

    jVarGlobalKeshavSoftDIV.innerHTML = "";

    jVarLocalKeshavSoftJSON.Grid1Data = jVarGlobalPrepareTable.jFJSONDataPrepareFromAPI({ inJVarData: jVarLocalKeshavSoftJSON.Grid1Data, inJVarColumns: jVarLocalKeshavSoftJSON.Grid1Columns })

    jFPrepareVerticalAnd2tables({ inJVarControlType: "CheckBox", inJVarDivId: jVarGlobalKeshavSoftDIV, inJVarNavigation: jVarLocalKeshavSoftJSON.Navigation, inJVarOnClickFunction: "jFJSONLevel1Import", inJVarGrid1: jVarLocalKeshavSoftJSON.Grid1Columns, inJVarGrid1Data: jVarLocalKeshavSoftJSON.Grid1Data, inJVarSnoAutomaticGrid1: true, inJVarStyleBodyGrid1: 'display:none' })

    jVarLocalKeshavSoftJSON.Grid1Columns = "";
    jVarLocalKeshavSoftJSON.Grid1Data = "";
}

let jVarGlobalTableButtonsRow = {
    jFTableHeadButtonsRow: function ({ inJVarGlobalKeshavSoftDIV, inJVarColumnInfo = [], inJVarInsertButtonTF = false }) {
        let jVarRow = jFInsertDOMWithinnerHTML("div", "", "kcssgridcol3", "", "", "");
        let jVarCol;

        inJVarColumnInfo.forEach(jVarLoopItem => {
            if (jVarLoopItem.DataAttribute === "CheckBox") {
                // here checkbox
                jVarCol = jFInsertDOMWithinnerHTML("div", "", "", "", "", "");
                jVarCol.appendChild(jFPrepareCheckBox({ inJVarInnerHtML: 'SelectAll', inJVarClassName: "SelectAll", inJVarOnClick: "jFSelectAllCheckBoxChangeEvent(event)" }));
                jVarRow.appendChild(jVarCol);

                //here button
                jVarCol = jFInsertDOMWithinnerHTML("div", "", "", "", "", "");
                jVarCol.appendChild(jFCreateButton("button", "Import", "BtnImport", "jFImport", " ; min-width:100%", "502", "btnClassImport TabClass btn btn-success my-2 my-sm-0"));
                jVarRow.appendChild(jVarCol);
            }
        })

        if (inJVarInsertButtonTF === true) {
            //here button
            jVarCol = jFInsertDOMWithinnerHTML("div", "", "", "", "", "");
            jVarCol.appendChild(jFCreateButton("button", "InsertRow", "BtnInsertRow", "jFInsertRow", " ; min-width:100%", "503", "btnClassInsertRow TabClass btn btn-success my-2 my-sm-0"));
            jVarRow.appendChild(jVarCol);
        }
        inJVarGlobalKeshavSoftDIV.appendChild(jVarRow);
    },

    jFTableFooterRowButtons: function ({ inJVarGlobalKeshavSoftDIV, inJVarInsertButtonTF = false }) {
        let jVarRow = jFInsertDOMWithinnerHTML("div", "", "kcssgridcol3", "", "", "");
        let jVarCol;

        if (inJVarInsertButtonTF === true) {
            jVarCol = jFInsertDOMWithinnerHTML("div", "", "", "", "", "");
            jVarCol.appendChild(jFCreateButton("button", "InsertRow", "BtnInsertRow", "jFInsertRow", " ; min-width:100%", "503", "btnClassInsertRow TabClass btn btn-success my-2 my-sm-0"));
            jVarRow.appendChild(jVarCol);

            jVarCol = jFInsertDOMWithinnerHTML("div", "", "", "", "", "");
            jVarCol.appendChild(jFCreateButton("button", "AddRow", "BtnAddRow", "jFAddRow", " ; min-width:100%", "503", "btnClassAddRow TabClass btn btn-success my-2 my-sm-0"));
            jVarRow.appendChild(jVarCol);

        }
        inJVarGlobalKeshavSoftDIV.appendChild(jVarRow);
    }
};

function jFSelectAllCheckBoxChangeEvent(inJVarEvent) {
    let jVarLocalCheckBoxs = document.querySelectorAll('.consider-CheckBox');

    if (inJVarEvent.target.checked === true) {
        jVarLocalCheckBoxs.forEach(jVarLoopItem => {
            jVarLoopItem.setAttribute('checked', true)
            jVarLoopItem.setAttribute('value', '1')
        })
    }
    else {
        jVarLocalCheckBoxs.forEach(jVarLoopItem => {
            jVarLoopItem.removeAttribute('checked')
            jVarLoopItem.setAttribute('value', '0')
        })
    }
}

function jFCheckBoxChangeEvent(inJVarEvent, inJVarKThis) {
    if (inJVarEvent.target.checked === true) {
        inJVarKThis.setAttribute('checked', true)
        inJVarKThis.setAttribute('value', '1')
    }
    else {
        inJVarKThis.removeAttribute('checked')
        inJVarKThis.setAttribute('value', '0')
    }
}

function jFImport() {
    let jVarLocalArray = [];
    let jVarLocalData1 = "";

    console.log('jVarLocalArray1', jVarLocalArray)

    document.querySelectorAll('.consider-CheckBox').forEach(jVarLoopItem => {
        jVarLocalArray.push(jVarLoopItem.value);
    })

    console.log('jVarLocalArray2', jVarLocalArray)

    document.querySelectorAll('.Elementclass').forEach(j => {
        if (jVarLocalData1 !== "") {
            jVarLocalData1 += "." + j.innerHTML;
        }
        else {
            jVarLocalData1 = j.innerHTML;
        }
    })

    // jVarGlobalXHTTP.jFXHTTPPostJSON({
    //     inJVarData: jVarLocalArray, inJVarURL: '/api/JSON/Import/' + jVarLocalData1, callback: function (jVarData, jVarError) {
    //     }
    // });

    jFXHTTPPost({
        inJVarData: jVarLocalArray, inJVarURL: '/api/JSON/Import/' + jVarLocalData1, callback: function (jVarData, jVarError) {
        }
    });
}

function jFInsertRow(inJVarKThis) {
    inJVarKThis.parentNode.parentNode.parentNode.getElementsByTagName('tfoot')[0].style.display = '';
    inJVarKThis.parentNode.parentNode.parentNode.getElementsByTagName('tfoot')[0].getElementsByClassName('TabClass')[0].focus();
}
