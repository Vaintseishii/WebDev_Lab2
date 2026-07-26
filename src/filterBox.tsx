import "./filterBox.css"

export default function FilterBox() {
    return (
     <div className="filterBox">
        <div className="searchBar">
            <input type="text" name="itemname" placeholder="search"/>
        </div>
     </div>   
    );
}