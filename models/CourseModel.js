const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please add a title"]
    },
    description: {
        type: String,
        required: [true, "please add a desc"]
    },
    weeks: {
        type: String,
        required: [true, "please add number of weeks"]
    },    
    tuition: {
        type: Number,
        required: [true, "please add tuition cost"]
    },
    minimumSkill: {
        type: String,
        required: [true, "please add a min skill"],
        enum: ['beginner', 'intermediate', 'advanced']
    },
    scholarshipAvailable: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    }    
});

//static method to get avg tuition
CourseSchema.statics.getAverageCost = async function (bootcampId) {
    console.log("calculating".blue);

    const obj = await this.aggregate([
        {
            $match: { bootcamp: bootcampId }
        },
        {
            $group: {
                _id: "$bootcamp",
                averageCost: { $avg: '$tuition'}
            }
        }
    ])
    console.log(obj)
}

//call getAverageCost after save
CourseSchema.post('save', function() {
    this.constructor.getAverageCost(this.bootcamp);
})

//call getAverageCost after remove
CourseSchema.post('remove', function() {
    this.constructor.getAverageCost(this.bootcamp);
})

module.exports = mongoose.model('Course', CourseSchema);