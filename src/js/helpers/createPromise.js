export function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
        setTimeout(() => {if (shouldResolve) {
            resolve({position, delay})
          } else {
            reject({position, delay})
          }}, delay)
        
    })
     
  }