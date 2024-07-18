const getState = ({ getStore, setStore }) => {
    const handleResponse = (response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.text().then(text => text ? JSON.parse(text) : {});
        // return response.json();
    };

    // Centralized function to refresh contacts
    // const refreshContacts = () => {
    //     fetch("https://playground.4geeks.com/contact/agendas/yjlmotley/contacts")
    //         .then(handleResponse)
    //         .then((data) => setStore({ contacts: data }))
    //         .catch((error) => console.error('Fetching contacts failed:', error));
    // };
    const refreshContacts = () => {
        fetch("https://playground.4geeks.com/contact/agendas/yjlmotley/contacts")
            .then(handleResponse)
            .then((data) => {
                console.log("Fetched contacts data:", data); // Log fetched data
                if (Array.isArray(data.contacts)) {
                    setStore({ contacts: data.contacts });
                    console.log("Contacts set in store:", data.contacts);
                } else {
                    console.error("Fetched data is not an array:", data);
                    setStore({ contacts: [] });
                }
            })
            .catch((error) => console.error('Fetching contacts failed:', error));
    };

    return {
        store: {
            contacts: [],
        },
        actions: {
            getContacts: refreshContacts, 

            addContacts: (contactData) => {
                fetch("https://playground.4geeks.com/contact/agendas/yjlmotley/contacts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contactData),
                })
                .then(handleResponse)
                .then(() => refreshContacts()) 
                .catch((error) => console.error('Adding contact failed:', error));
            },

            deleteContacts: (id) => {
                fetch(`https://playground.4geeks.com/contact/agendas/yjlmotley/contacts/${id}`, {
                    method: "DELETE",
                })
                .then(handleResponse)
                .then(() => {refreshContacts();}) 
                .catch((error) => console.error('Deleting contact failed:', error));
            },

            editContact: (id, contactData) => {
                fetch(`https://playground.4geeks.com/contact/agendas/yjlmotley/contacts/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contactData),
                })
                .then(handleResponse)
                .then(() => refreshContacts()) 
                .catch((error) => console.error('Editing contact failed:', error));
            },
        },
    };
};

export default getState;