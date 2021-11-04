const express = require('express')
const WordRouter = express.Router()

const Word = require('../../models/Word')

WordRouter.route('/(:word)?').get( async (req, res) => {
    let words = []
    const { word } = req.params
    
    if(word !== "undefined" && word !== undefined){ // 검색어가 존재하는 경우
        console.log(word)
        try{
            // words = [
            //     {
            //         r_seq: "1",
            //         r_word: "학원",
            //         r_link: "https//google.com",
            //         r_chi: "한자",
            //         r_des: "학원은 지루하다",
            //         r_pos: "포스",
            //     },
            //     {
            //         r_seq: "1",
            //         r_word: "학원",
            //         r_link: "https//google.com",
            //         r_chi: "한자",
            //         r_des: "학원은 지루하다",
            //         r_pos: "포스",
            //     }
            // ]
            // words = await Word.find({ r_word: word }) // Word 모델의 r_word 필드에서 쿼리와 일치하는 단어 검색
            // words = await Word.find({ r_word: { $regex:`^${word}`}}) // Word 모델의 r_word 필드에서 쿼리로 시작하는 단어 검색
            // words = await Word.find({ r_word: { $regex:`${word}$`}}) // Word 모델의 r_word 필드에서 쿼리로 끝나는 단어 검색
            // words = await Word.find({ r_des: { $regex:`${word}`}}) // Word 모델의 r_des 필드에서 쿼리를 포함하는 단어 검색

            // words = await Word.find({ $or: [ // Word 모델의 r_word 필드와 r_des 필드에서 쿼리를 포함하는 단어 검색
            //     {r_word: {$regex: `${word}`}},
            //     {r_des: {$regex: `${word}`}}
            // ]})

            words = await Word.find({
              $or: [ // Word 모델의 r_word 필드와 r_des 필드에서 쿼리를 포함하는 단어 검색 후 최신순으로 정렬하고 3개만 가져오기
                {r_word: {$regex: `${word}`}},
                {r_des: {$regex: `${word}`}}
            ]})
            // .sort({"_id": -1}) // -1 : 최신순(내림차순), 1 : 과거순(오름차순)
            // .limit(6)

            }catch(e){
                console.log(e)
            }
        }else{ // 검색어가 존재하지 않은 경우
            console.log(word)
            try{
                // words = [
                //     {
                //         r_seq: "1",
                //         r_word: "학원",
                //         r_link: "https//google.com",
                //         r_chi: "한자",
                //         r_des: "학원은 지루하다",
                //         r_pos: "포스",
                //     },
                //     {
                //         r_seq: "1",
                //         r_word: "학원",
                //         r_link: "https//google.com",
                //         r_chi: "한자",
                //         r_des: "학원은 지루하다",
                //         r_pos: "포스",
                //     },
                //     {
                //         r_seq: "1",
                //         r_word: "학원",
                //         r_link: "https//google.com",
                //         r_chi: "한자",
                //         r_des: "학원은 지루하다",
                //         r_pos: "포스",
                //     },
                //     {
                //         r_seq: "1",
                //         r_word: "학원",
                //         r_link: "https//google.com",
                //         r_chi: "한자",
                //         r_des: "학원은 지루하다",
                //         r_pos: "포스",
                //     },
                //     {
                //         r_seq: "1",
                //         r_word: "학원",
                //         r_link: "https//google.com",
                //         r_chi: "한자",
                //         r_des: "학원은 지루하다",
                //         r_pos: "포스",
                //     },
                //     {
                //         r_seq: "1",
                //         r_word: "학원",
                //         r_link: "https//google.com",
                //         r_chi: "한자",
                //         r_des: "학원은 지루하다",
                //         r_pos: "포스",
                //     }
                // ]
                words = await Word.find() // 데이터베이스에서 전체 단어 검색
            }catch(e){
                console.log(e)
            }
        }
        res.json({status: 200, words})
    })
            
    module.exports = WordRouter 