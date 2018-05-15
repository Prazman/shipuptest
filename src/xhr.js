function load(method, url, data, successcallback, errorcallback) {
    var xhr;

    xhr = new XMLHttpRequest();


    xhr.onreadystatechange = ensureReadiness;

    function ensureReadiness() {
        if (xhr.readyState < 4) {
            return;
        }

        if (xhr.status !== 200) {
            errorcallback(xhr);
            return;
        }

        // all is well  
        if (xhr.readyState === 4) {
            successcallback(xhr);
        }
    }

    xhr.open(method, url, true);
    if (method == "POST") {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k) {
                var datastring = (data[k])?encodeURIComponent(data[k]):'';
                return encodeURIComponent(k) + '=' + datastring;
            }
        ).join('&');

        xhr.send(params);
    } else {
        xhr.send();
    }
}

export default load;