export default function asyncify(fn) {
    return (...args) => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(fn(...args));
        }, Math.random() * 1000);
    })
}
