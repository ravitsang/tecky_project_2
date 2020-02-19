window.onload = async () => {


    const res = await fetch('/article/showTopic',{
        method:'get'
    })
    const result = await res.json()
    console.log(result);
}