
function Apcard(props){
    return(
        <div className={`card text-white bg-${props.type} mb-3`}>
            <div className="card-header" style={{textAlign:'center'}}>{props.header}</div>
            <div className="card-body">
                <div className="card-text">Count : {props.count}</div><br />
                <div className="card-title">Health Status : {props.health}</div>
            </div>
            <div className="card-footer">
                <button className={`btn text-white bg-${props.type}`} onClick={() => props.onUpdate(props)}>Update Device</button>
                <button className={`btn text-white bg-${props.type}`} onClick={() => props.onDelete(props)}>Delete Device</button>
            </div>
        </div>
    );
}

export {Apcard};