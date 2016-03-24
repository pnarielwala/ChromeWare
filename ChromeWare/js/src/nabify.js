/**
 * Created by pnarielwala on 3/17/2016.
 */

//This file changes the tab title to reflect the contents
if(document.title.indexOf("Modification of Function") > 0){
    document.title = "Fn: " + document.title.split('"')[1]
};
if(document.title.indexOf("Modification of Constant") > 0){
    document.title = "Cst: " + document.title.split('"')[1]
};
if(document.title.indexOf("Modification of Table Field") > 0){
    document.title = "Pg: " + document.title.split('"')[1]
};
if(document.title.indexOf("Modification of Batch") > 0){
    document.title = "B: " + document.title.split('"')[1]
}