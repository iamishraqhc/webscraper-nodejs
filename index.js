import axios from "axios"
import cheerio from "cheerio"
import express from "express"

const PORT = process.env.PORT || 5000
const app = express()

const URL = 'https://www.manchestereveningnews.co.uk/sport/football/'

axios(URL)
    .then(res => {
        const htmlData = res.data
        const $ = cheerio.load(htmlData)
        const articles = []

        $('.teaser', htmlData).each((index, element) => {
            const title = $(element).children('.headline').text()
            const titleURL = $(element).children('.headline').attr('href')
            articles.push({
                title,
                titleURL
            })
        })
        console.log(articles)
    }).catch(err => console.error(err))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
