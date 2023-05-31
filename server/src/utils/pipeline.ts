const pipeline = function (callbacks: ((x: any) => any)[]) {
    return function(x?: any) {
        return callbacks.reduce((a, b)=> b(a),x)
    }
};

export default pipeline;
