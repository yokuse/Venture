import { date, number, object, ref, string, TypeOf } from 'yup';
import  { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import zxcvbnEnPackage from '@zxcvbn-ts/language-en'
import sanitizeHtml from 'sanitize-html';
import { any } from 'cypress/types/bluebird';

export const updateSchema = object({
    id: number().integer().min(1),
    title: string().min(3).max(100).required().transform(
        (title) => title.replace(/\&/gm, ' and ').replace(/[\<\>]/gm, ' ').replace(/[\n+|\r+]/gm, '').replace(/\s+/gm, ' ')
    ),
    description: string().min(3).max(2000).required().transform(
        (title) => title.replace(/\&/gm, ' and ').replace(/[\<\>]/gm, ' ').replace(/[\n+|\r+]/gm, '').replace(/\s+/gm, ' ')
    ),
    highlights: string().min(3).max(2000).required().transform(
        (title) => title.replace(/\&/gm, ' and ').replace(/[\<\>]/gm, ' ').replace(/[\n+|\r+]/gm, '').replace(/\s+/gm, ' ')
    ),
    busi_model: string().min(3).max(2000).required().transform(
        (title) => title.replace(/\&/gm, ' and ').replace(/[\<\>]/gm, ' ').replace(/[\n+|\r+]/gm, '').replace(/\s+/gm, ' ')
    ),
    image: string().transform(
      (image) => image.replace(/[\<\>]/gm, '')
    ),
    closingDate: string().required().matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\s)?[a-zA-Z\d\s\w\:\+\(\)]+$/),
    updatedAt: string().required().matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\s)?[a-zA-Z\d\s\w\:\+\(\)]+$/),
    createdAt: string().required().matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\s)?[a-zA-Z\d\s\w\:\+\(\)]+$/),
    closingDateFill: date(),
    email: string().email()
})

export type Update = TypeOf<typeof updateSchema>;
