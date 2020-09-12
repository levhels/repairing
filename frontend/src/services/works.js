export class WorksService {
    constructor(){
        this.works = {"test":"test"}
        this.units = {"test":"test"}
        this.categories = {"test":"test"}
        //console.log(this.notes)
    }

    /**
     * Gets up-to-date list of notes
     */
    getWorks(successCallback){
        let getObject = {
            method: "GET",
            mode: "cors",
            credentials:"include",
            headers: {"Content-Type":"application/json"}
        }
            
        fetch("/works", getObject).then((response) => {
            if(response.ok) {
                response.json().then((data) => {
                    this.works = data
                    //console.log("servicedata", this.works) 
                    successCallback(data);                       
                }).catch((error) => {
                    console.log(error);
                })
            } else {
                console.log("Response not ok. Status:"+response.status)
            }
        }).catch((error) => {
            console.log(error);
        });

        return this.works
        
    }

    addWorkItem = item => {
        let postObject = {
            method: "POST",
            mode: "cors",
            credentials:"include",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(item)
        }
        console.log("будут отправлены",item); 
        fetch("/works", postObject).then((response) => {
            if(response.ok) {
                console.log("данные добавлены")                
            } else {
                console.log("Response not ok. Status:"+response.status)
            }
        }).catch((error) => {
            console.log(error);
        });       
    }

    editWorkItem = item => {
        let postObject = {
            method: "PUT",
            mode: "cors",
            credentials:"include",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(item)
        }
        console.log("будут перезаписаны",item); 
        fetch("/works", postObject).then((response) => {
            if(response.ok) {
                console.log("данные сохранены")                
            } else {
                console.log("Response not ok. Status:"+response.status)
            }
        }).catch((error) => {
            console.log(error);
        });       
    }

    removeWorkItem = (id) => {
        let deleteObject= {
              method:"DELETE",
              mode:"cors",
              credentials:"include",
              headers:{"Content-Type":"application/json"}
        }
        console.log("servise-delete", id.target)
        fetch("/works/"+id,deleteObject).then((response) => {
          if(response.ok) {
            console.log("запись удалена")
            
          } else {
              console.log("Response not ok. Status:"+response.status)
          }
      }).catch((error) => {
          console.log(error);
      });	  
    }

    /**
     * Gets up-to-date list of units
     */
    getUnits(successCallback1){

        let getObject = {
            method: "GET",
            mode: "cors",
            credentials:"include",
            headers: {"Content-Type":"application/json"}
        }            
        fetch("/units", getObject).then((response) => {
            //console.log("responce-units")
            if(response.ok) {
                response.json().then((data) => {
                    this.units = data
                    //console.log("unitsservicedata", this.units) 
                    successCallback1(data);                       
                }).catch((error) => {
                    console.log(error);
                })
            } else {
                console.log("Response not ok. Status:"+response.status)
            }
        }).catch((error) => {
            console.log(error);
        });

        return this.units
        
    }

        /**
     * Gets up-to-date list of notes
     */
    getCategories(successCallback2){
        console.log("kukuku")
        let getObject = {
            method: "GET",
            mode: "cors",
            credentials:"include",
            headers: {"Content-Type":"application/json"}
        }            
        fetch("/categories", getObject).then((response) => {
            console.log("responce-categories")
            if(response.ok) {
                response.json().then((data) => {
                    this.units = data
                    console.log("categoriesservicedata", this.categories) 
                    successCallback2(data);                       
                }).catch((error) => {
                    console.log(error);
                })
            } else {
                console.log("Response not ok. Status:"+response.status)
            }
        }).catch((error) => {
            console.log(error);
        });

        return this.categories
        
    }


}