import React from 'react'
import { Pane } from '@cybercongress/gravity';
import styles from '../skills.scss';

const ItemsList = props => {


    return (
        <table
            style={{
                borderSpacing: '5px 16px',
                borderCollapse: 'separate',
            }}
            className={styles.itemsTable}
        >
            <thead>
            <tr>
                <th scope="col">skill</th>
                <th scope="col">network</th>
                <th scope="col">endpoint</th>
                <th scope="col" style={{width: '1%'}}></th>
            </tr>
            </thead>
            <tbody>
            {Object.keys(props.items).length > 0 ? (
                Object.keys(props.items).map((skillType, index) => (
                    props.items[skillType].map((item,indexSkill) => (
                        <tr key={item.id}>
                            <td>{indexSkill<1 && skillType}</td>
                            <td>{item.network}</td>
                            {/* <td>{item}</td> */}
                            <td>{item.endpoint}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        props.onEdit(item)
                                    }}
                                    className="btn"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        props.onActivate(skillType, item)
                                    }}
                                    className="btn"
                                >
                                    Activate
                                </button>


                            </td>
                        </tr>
                    ))
                ))
            ) : (
                <tr>
                    <td colSpan={6}>No Skills</td>
                </tr>
            )}
            </tbody>
        </table>
    )
}

export default ItemsList;