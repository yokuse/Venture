import { object, ref, string, TypeOf } from 'yup';
import  { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import zxcvbnEnPackage from '@zxcvbn-ts/language-en'

export const registerSchema = object({
    firstName: string().min(3).max(20).required().matches(/^(?=.*[a-zA-Z])(?=.*\s)?[a-zA-Z\s]+$/).transform(
        (firstName) => firstName.replace(/\b\s+\b/gm, ' ')
        ),
    lastName: string().min(3).max(20).required().matches(/^(?=.*[a-zA-Z])(?=.*\s)?[a-zA-Z\s]+$/).transform(
        (lastName) => lastName.replace(/\b\s+\b/gm, ' ')
        ),
    email: string().required().email(),
    password: string().required().min(8).max(25).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\%\^\&\*])[a-zA-Z\d\w\!\@\#\%\^\&\*]+$/).test(
        'validate-passwd',
        '',
        (data, { createError }: any) => { 
          // you can get it here
          if (!data) return false;
          
          const options = {
            translations: zxcvbnEnPackage.translations,
            graphs: zxcvbnCommonPackage.adjacencyGraphs,
            dictionary: {
              ...zxcvbnCommonPackage.dictionary,
              ...zxcvbnEnPackage.dictionary,
            },
          }
          zxcvbnOptions.setOptions(options)
          if(data != null){
            const result = zxcvbn(data)
            if (result.guessesLog10 < 8 && result.guesses < 100000000 && result.score < 3 ) {
              return createError({
              message: `Password too simple!\nPassword strength: `+result.score +" / 4" ,
              });
            }
            else{
              return true;
            }
          }   
        }
      ),
    // confirmPassword: string().oneOf([ref('password'), null]).required()
})

export type Register = TypeOf<typeof registerSchema>;