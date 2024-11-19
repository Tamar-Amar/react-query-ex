import React, { useState } from 'react';
import Style from './CarDetailsEdit.module.css';

interface CarDetailsEditProps {
    data: { color: string; model_name: string; plate_number: string; _id: string;},
    onDelete: (id: string) => void;
    onUpdate: (car: object) => void;
}

const CarDetailsEdit: React.FC<CarDetailsEditProps> = ({ data, onDelete, onUpdate }) => {
    const [isEdit, setIsEdit] = useState(false);
    const toggleEdit = () => { setIsEdit(!isEdit) }

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const car = {
            color: (form[1] as HTMLInputElement).value,
            model_name: (form[0] as HTMLInputElement).value,
            plate_number: (form[2] as HTMLInputElement).value,
            _id: data._id
        }
        onUpdate(car);
        setIsEdit(false);
    }

    const form = () => {
        return (
            <form onSubmit={handleUpdate} className={Style.formLayout}>
                <h2><b>Edit car</b></h2><br/>
                <input type="text" placeholder={data.model_name} defaultValue={data.model_name} />
                <input type="text" placeholder={data.color} defaultValue={data.color} />
                <input type="text" placeholder={data.plate_number} defaultValue={data.plate_number} />
                <div className={Style.row}>
                    <button onClick={toggleEdit} className={`${Style.button} ${Style.buttonEdit}`}>Cancel</button>
                    <button type="submit" className={`${Style.button} ${Style.buttonEdit}`}><b>Update Car</b></button>
                </div>
            </form>
        );
    }

    if (!isEdit) {
        return (
            <div className={Style.CarDetailsEditetails}>
                <div>
                    <h3><b>Name: </b><br/>{data.model_name}</h3><br/>
                    <p><b>Color: </b><br/>{data.color}</p><br/>
                    <p><b>Plate number: </b><br/>{data.plate_number}</p><br/>
                    <button onClick={() => onDelete(data._id)} className={`${Style.button} ${Style.buttonDelete}`}>Delete</button>
                    <button onClick={toggleEdit} className={`${Style.button} ${Style.buttonEdit}`}>Edit</button>
                </div>
            </div>
        );
    } 
    else { return (<div>{form()}</div>);}
}

export default CarDetailsEdit;
