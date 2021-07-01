// const promise = new Promise((resolve, reject)=>{
//     setTimeout(() => {
//         resolve(2)
//     }, 2000);
// })

// promise
//     .then(num => num *= 2)
//     .catch(err => console.log(err))
//     .then(num => num *= 3)
//     .then(num => console.log(num))
//     .finally(() => console.log('finally'))
class myPromise {
    constructor(cb){
        this.thens = []
        this.catches = null
        this.finallies = null

        function resolve(data) {
            this.thens.forEach(then => {
                data = then(data)
            });

            if (this.finallies) {
                this.finallies()
            }
        }
        function reject(err) {
            if (this.catches) {
                this.catches(err)
            }
            if (this.finallies) {
                this.finallies()
            }
        }
        cb(resolve.bind(this), reject.bind(this))
    }
    then(cb) {
        this.thens.push(cb)
        return this
    }
    catch(cb) {
        if (this.catches == null) {
            this.catches = cb
        }
        return this
    } 
    finally(cb) {
        if (this.finallies !== null) {
            this.finallies = cb
        }
        return this
    } 
}

const promise = new myPromise((resolve, reject)=>{
    setTimeout(() => {
        // reject('Error')
        resolve(2)
    }, 2000);
})

promise
    .then(num => num *= 2)
    .catch(err => console.log(err))
    .then(num => num *= 3)
    .then(num => console.log(num))
    .finally(() => console.log('finally'))

