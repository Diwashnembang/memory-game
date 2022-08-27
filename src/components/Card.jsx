import "./card.css"


const Card = (props) => {

    const { image } = props;
    return (
        <div className={`image `}>
            <img src={image.flag} alt={image.code} />
        </div>
    )

}

export default Card;