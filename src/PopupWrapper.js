
/**
 * Basic wrapper that greys out page and prevents scrolling to display popup content.
 * @param {HTML} props HTML content to render in the center of the page.
 */
function PopupWrapper(props) {
    return (
        <div className="requires-no-scroll" style={{position:"fixed", top:"0px", left:"0px", width:"100vw", height:"100vh", backgroundColor:"rgba(100,100,100, 0.4)", alignContent:"center",  zIndex:"100"}}>
                {props.children}
        </div>
    )
}

export default PopupWrapper;