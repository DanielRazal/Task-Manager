import React, { useState } from 'react';
import Lists from './Lists';
import Tasks from './Tasks';

function ListTasksPage() {
    const [selectedListId, setSelectedListId] = useState(null);

    const handleListClick = (listId) => {
        setSelectedListId(listId);
    };

    return (
        <div className="flex">
            <Lists onListClick={handleListClick} />
            <Tasks selectedListId={selectedListId} />
        </div>
    );
}

export default ListTasksPage;
