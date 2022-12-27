function result() {
    var list = getList();
}

const getList = () => {
    let ls = []
    for(i=1; i<=4; i++){
        ls.push(document.getElementById("list" + i).childNodes.item(0).getAttribute("id"));
    }
    console.log(ls)
    return ls
}