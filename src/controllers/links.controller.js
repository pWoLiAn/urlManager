const linksCtrl = {};

const pool = require('../database');
const odbc = require('odbc');
const { database, port, connectionString } = require('../config');

linksCtrl.renderAddLink = (req, res) => {
    res.render('links/add');
};

linksCtrl.addLink = async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    odbc.connect(connectionString, (error, connection) => {
        connection.query('INSERT INTO links (title, url, description, user_id) values ("'+title+'","'+url+'","'+description+'", '+req.user.id+')', (error, result) => {
            if (error) { 
                console.error(error)
                req.flash('failed', 'Link couldnt be saved') 
                return;
            }
            console.log("Inserted the link successfully");
            req.flash('success', 'Link Saved Successfully');
            res.redirect('/links');
        });
    });     
}

linksCtrl.renderLinks = async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links });
}

linksCtrl.deleteLink = async (req, res) => {
    const { id } = req.params;
    odbc.connect(connectionString, (error, connection) => {
        connection.query('DELETE FROM links WHERE ID ='+id, (error, result) => {
            if (error) { 
                console.error(error)
                req.flash('failed', 'Link couldnt be deleted') 
                return;
            }
            console.log("Deleted the link successfully");
            req.flash('success', 'Link Removed Successfully');
            res.redirect('/links');
        });
    });    
};

linksCtrl.renderEditLink = async (req, res) => {
    const { id } = req.params;
    odbc.connect(connectionString, (error, connection) => {
        connection.query('SELECT * FROM links WHERE id ='+id, (error, links) => {
            if (error) { 
                console.error(error)
                req.flash('failed', 'Link couldnt be deleted') 
                return;
            }
            res.render('links/edit', {link: links[0]});
        });
    });    

};

linksCtrl.editLink = async (req,res) => {
    const { id } = req.params;
    const { title, description, url} = req.body; 
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/links');
}

module.exports = linksCtrl;