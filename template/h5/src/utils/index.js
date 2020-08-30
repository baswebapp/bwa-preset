export const loadImage = src=>{
    return new Promise((resolve,reject)=>{

        var _image = new Image();
        var _complete = ()=>{
            resolve(_image);
            _complete = ()=>{};
        };

        //加载完成
        _image.onload = _complete;

        //错误
        _image.onerror = reject;

        //设置加载路径
        _image.src = src;

        if (_image.complete) { _complete(); };
    });
}