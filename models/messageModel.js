exports.load = function(db) {
    return db.define('messages', {
        id: String,
        title: String,
        name: String,
        message: String,
        date: Number
    }, {
        methods: {
            getMessage: function() {
                return {
                    id: this.id,
                    title: this.title,
                    name: this.name,
                    message: this.message,
                    date: this.date
                };
            }
        }
    });
};
