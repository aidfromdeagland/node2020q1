module.exports  = [
    {
        'name': 'guests',
        'permissions': ['READ']
    },
    {
        'name': 'users',
        'permissions': ['READ', 'WRITE', 'SHARE', 'UPLOAD_FILES']
    },
    {
        'name': 'moderators',
        'permissions': ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
    }
];
