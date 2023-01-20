//this function is responsible for cleaning userdata before been inserted into the database
import bycript from 'bcrypt'


let salt = 10;
export default async function tst(values) {
    let userdata = {};

    await new Promise(resolve => {
        values.forEach(async(feild) => {
            if (feild.id == 'password') {

                userdata[feild.id] = await bycript.hash(feild.value, salt);
                resolve()
            } else {
                userdata[feild.id] = feild.value

            }
        })
    })

    return userdata;

}