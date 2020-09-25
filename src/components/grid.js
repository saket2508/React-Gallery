import React from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { motion } from 'framer-motion';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { IconButton } from '@material-ui/core';


const GridImages = ({photos, setSelectedImg}) => {

    const download = async (id) => {
        let url = "https://api.unsplash.com/photos/?client_id="+process.env.REACT_APP_UNSPLASH_API_KEY+"&"+id+"/download"
        let res = await fetch(url)
        let response = await res.json()
        console.log(response)
    };


    const LikeButton = (item) => {
        if(item.selected){
            return(
                <IconButton style={{color:'#f50057', fontSize:'18px'}} onClick={() => console.log(item)}>
                <FavoriteIcon/>
            </IconButton>
            )
        }
        else{
            return(
                <IconButton style={{color:'#757575', fontSize:'18px'}} onClick={() => console.log(item)}>
                <FavoriteBorderIcon/>
            </IconButton>
            )
        }
    }

    return(  
        <div className="container-fluid mt-4 mb-2">
            <div className="card-columns">
                {photos.map((item, index) => (
                    // <img className="img-fluid" alt="Responsive image" src={item.urls.regular}/>
                    <motion.div key={index} className="card"
                        layout
                        whileHover={{ opacity:1 }}
                        >
                        <motion.img src={item.urls.small} className="card-img-top" 
                            onClick={() => setSelectedImg(item.urls.regular)}
                            initial={{opacity:0}}
                            animate={{opacity:1}}
                            transition={{delay:1}}
                        />
                        <div class="card-body">
                            <div className="action">
                                        {/* {item.liked_by_user && <IconButton style={{color:'#757575', fontSize:'18px'}} onClick={() => imageAction(item)}>
                                            <FavoriteBorderIcon/>
                                        </IconButton>} 
                                        {!item.liked_by_user && <IconButton style={{color:'#f50057', fontSize:'18px'}} onClick={() => imageAction(item)}>
                                            <FavoriteIcon/>
                                        </IconButton>}   */}
                                        <LikeButton item = {item}/>
                                        <a href={item.links.download+ "?force=true"} className="btn btn-sm btn-light border-0 rounded-lg" onClick={() => download(item.id)}>
                                            <i className="fas fa-arrow-down custom-icon" style={{color:"#689f38"}}></i> 
                                        </a>
                                </div>
                                <div className="photo-header mt-1 mb-1">Photo by <a href={item.user.links.html}>{item.user.name}</a> on <a href="https://unsplash.com/">Unsplash</a></div>
                                {item.description && <p class="card-text">{item.description}</p>}
                                <div className="tags mt-1">
                                    {item.tags.map((tag) => (
                                        <span className='tag px-3 py-1 mr-2 rounded-pill'>#{tag.title}</span>
                                    ))}
                                </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
   )
}

export default GridImages