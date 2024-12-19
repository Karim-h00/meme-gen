import { useState, useEffect } from "react";

function Meme() {
    
    const [meme, setMeme] = useState({
        topText: 'One does not simply',
        bottomText: 'Walk into Mordor',
        imageURL: 'http://i.imgflip.com/1bij.jpg'
    });

    const[allMemes, setAllMemes] = useState([])

    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
            .then(res=> res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function handleChange(e){
        const {value, name} = e.currentTarget;
        setMeme({
            ...meme, 
            [name]: value
        })
    }

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const newMemeUrl = allMemes[randomNumber].url
        setMeme(prevMeme =>({
            ...prevMeme, 
            imageURL: newMemeUrl
        }))
    }

    return (
        <main>
            <div className="form">
                <div>
                    <label htmlFor="topText" className="form--label">Top text</label>
                    <input type="text"
                     id="topText"
                     name="topText"
                     placeholder="One does not simply" 
                     className="form--input"
                     onChange={handleChange}
                     value={meme.topText} />
                </div>
                <div>
                    <label htmlFor="bottomText" className="form--label">Bottom text</label>
                    <input type="text"
                     id="bottomText"
                     name="bottomText"
                     placeholder="Walk into Mordor" 
                    className="form--input"
                    onChange={handleChange}
                    value={meme.bottomText} />
                </div>
                <button 
                onClick={getMemeImage}
                className="form--button">
                    Get a new meme image 🖼
                </button>
            </div>

            <div className="meme">
                <img src={meme.imageURL} alt="meme" className="meme-image" />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}

export default Meme;

