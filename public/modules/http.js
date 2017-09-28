/**
 * Модуль, предоставляющий методы для выполнения HTTP-запросов
 * @module Http
 */

const baseUrl = `${window.location.protocol}//${window.location.host}`;


class Http {
    static Get(address) {
        const url = (Http.BaseUrl || baseUrl) + address;
        if (typeof window.fetch !== 'undefined') {
            return this._FetchGet(url);
        }
        return this._GetXMLHttpRequest(url);
    }

    static Post(address, body) {
        const url = (Http.BaseUrl || baseUrl) + address;
        if (typeof window.fetch !== 'undefined') {
            return this._FetchPost(body, url);
        }
        return this._PostXMLHttpRequest(body, url);
    }


    /**
     * Выполняет GET-запрос по указанному адресу
     * @param {string} url - адрес запроса
     * @return {Promise}
     */
    static _GetXMLHttpRequest(url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.withCredentials = true;

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (+xhr.status >= 400) {
                    alert(xhr.responseText);
                    reject(xhr);
                    return;
                }

                const response = JSON.parse(xhr.responseText);
                resolve(response);
            };

            xhr.send();
        });
    };

    /**
     * Выполняет POST-запрос по указанному адресу
     * @param {string} url - адрес запроса
     * @param {*} body - тело запроса (объект)
     * @param {string} url
     * @return {Promise}
     */
    static _PostXMLHttpRequest(body, url) {
        console.log(JSON.stringify(body));
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (+xhr.status >= 400) {
                    debugger;
                    reject(xhr);
                    return;
                }

                const response = JSON.parse(xhr.responseText);
                resolve(response);
            };

            xhr.send(JSON.stringify(body));
        });
    };

    /**
     * Выполняет GET-запрос по указанному адресу с использованием fetch
     * @param {string} url - адрес запроса
     * @return {Promise}
     */
    static _FetchGet(url) {
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then(function (response) {
                let json = response.json();
                if (response.status >= 400) {
                    return json.then(response => {throw response;});
                }
                return json;
            })
    };

    /**
     * Выполняет POST-запрос по указанному адресу с использованием fetch
     * @param {string} url - адрес запроса
     * @param {*} body - тело запроса (объект)
     * @return {Promise}
     */
    static _FetchPost(body, url) {
        console.log(JSON.stringify(body));
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(function (response) {
                let json = response.json();
                if (response.status >= 400) {
                    return json.then(response => {throw response;});
                }
                return json;
            })
    };

}

Http.BaseUrl = null;

export default Http;
