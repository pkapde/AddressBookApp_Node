function makeServiceCall(methodType, url, async, data = null) {
    console.log("Data Is:" + data)
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState >= 0 || xhr.status == 200) {
                if (xhr.status === 200 || xhr.status === 201) {
                    let abc = JSON.stringify(xhr.responseText);
                    setTimeout(() => {
                        resolve(xhr.responseText);
                    }, 500);
                } else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("Handled 400 client error or 500 server error at:" + showTime());
                }
            }
        }
        xhr.onerror = function() {
            reject({
                status: xhr.status,
                statusText: xhttp.statusText
            });
        };

        xhr.open(methodType, url, async);
        if (data != null) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
            console.log(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType + " Request sent to the server at: " + showTime());
    });
}