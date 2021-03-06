const { extract_enemy_camps } = require('../utils/decrypt');
const Decrypt = require('../models/decrypt')

exports.decrypt = (req, res) => {
    try{
        const { encrypted_message, key, all_camp_names } = req.body

        const length_of_message = encrypted_message.length
        const length_of_key = key.length
        const number_of_rows = Math.ceil(length_of_message / length_of_key)

        const sorted_letters_of_key = key.split('').sort()

        let indexes = {} // key-value pairs of lexicographic order of key's letters, for example { D: 0, E: 1, H: 2, I: 3, L: 4 }

        for(let i=0; i < sorted_letters_of_key.length; i++){
            indexes[sorted_letters_of_key[i]] = i
        }

        let decrypted_message = ''

        outerLoop: for(let i=0; i < number_of_rows; i++){
            for (letter of key){
                let index = number_of_rows * indexes[letter] + i;
                let character = encrypted_message[index]
                if(character === '_'){
                    break outerLoop
                }
                decrypted_message += character
            }
        }

        const enemy_camps = extract_enemy_camps(decrypted_message, all_camp_names)

        res.status(200).json({
            decrypted_message,
            enemy_camps
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send("Something went wrong")
    }    
}

exports.get_history = async(req, res) => {
    try{
        const history = await Decrypt.find()
        res.status(200).json({
            history
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

exports.add = async(req, res) => {
    try{
        const { decrypted, desired_location, timestamp } = req.body
        await new Decrypt({
            decrypted, 
            desired_location,
            timestamp
        }).save()
        res.status(200).json({
            message:'success'
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}
