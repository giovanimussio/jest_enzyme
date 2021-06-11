function fetchData(callback){
    setTimeout(() => {
        callback("peanut butter");
    },100);
};

function fetchDataPromise(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("peanut butter");
        },100);
    });
};

function fetchDataPromiseWithErrorMessage(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            reject("error");
        },100);
    });
};

function fetchDataPromiseError(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            reject(new Error("error"));
        },100);
    });
};
//Don't do this
/*test("the data is peanut butter",() => {
    function callback(data){
        expect(data).toBe("peanut butter");
    }
    fetchData(callback);
});*/

//Jest só termina o teste quando o done for chamado e assim garante que o teste esteja funcionando corretamente
test("the data is peanut butter",done => {
    function callback(data){
        expect(data).toBe("peanut butter");
        done();
    }
    fetchData(callback);
});

//===promises
test("the data is peanut butter, using promise", () => {
    return fetchDataPromise().then(data => {
        expect(data).toBe("peanut butter");
    });
});

test("the fetch fails with an error",() => {
    expect.assertions(1);
    return fetchDataPromiseWithErrorMessage().catch(e => expect(e).toMatch("error"));
});
//expera que o retorno dessa fetchData retorna peanut butter
test("the data is peanut butter, resolves", () => {
    return expect(fetchDataPromise()).resolves.toBe('peanut butter');
});

test("the data is peanut butter, rejects", () => {
    return expect(fetchDataPromiseWithErrorMessage()).rejects.toBe('error');
});

//async

test("the data is peanut butter using async", async () =>{
    const data = await fetchDataPromise();
    expect(data).toBe("peanut butter");
});

test("the fetch fails with an error, async function", async () => {
    expect.assertions(1);
    try{
        await fetchDataPromiseWithErrorMessage();
    } catch(e) {
        expect(e).toMatch("error");
    }
});

test("the data is peanut butter, using await and resolves", async () => {
    await expect(fetchDataPromise()).resolves.toBe("peanut butter");
});

test("the data is peanut butter, using await and rejects", async () => {
    await expect(fetchDataPromiseError()).rejects.toThrow("error");
});