class AJAX{
    constructor(tables){
        this.tables=tables;
        this.xmlreq=new XMLHttpRequest();
        this.xmlreq.responseType="json";    
    }
    read(collection,callback,endpoint,params){
        console.log("RUTA",tables.get(collection)+endpoint);
        this.xmlreq.open("GET",this.tables.get(collection)+endpoint,true);
        this.xmlreq.onerror=()=>{
            console.log("ERROR");
            console.log(this.xmlreq.status);
            console.log(this.xmlreq.response);
            console.log("ERROR");
        }
        this.xmlreq.onreadystatechange=()=>{
            if (this.xmlreq.readyState == 4 && this.xmlreq.status == 200) {
                callback(this.xmlreq.response,params);
            }
        }
        this.xmlreq.send();
    }
    write(type,collection,content,callback,endpoint,params){
        this.xmlreq.open(type,this.tables.get(collection)+endpoint,true);
        this.xmlreq.setRequestHeader('Content-Type','application/JSON');
        this.xmlreq.onerror=()=>{
            console.log(this.xmlreq.status);
            console.log(this.xmlreq.response);
        }
        this.xmlreq.onreadystatechange=()=>{
            if (this.xmlreq.readyState == 4 && this.xmlreq.status == 204) {
                console.log("delete");
                callback(this.xmlreq.response,params);
            }
            if (this.xmlreq.readyState == 4 && this.xmlreq.status == 201) {
                console.log("put or post");
                callback(this.xmlreq.response,params);
            }
        }
        try {
            console.log(content);
            this.xmlreq.send(content);
        } catch (error) {
            console.log(error);
        }
    }
}