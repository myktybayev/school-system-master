Blaze.registerHelper("schoolName", function(schoolId) {
    return Schools.findOne({schoolId:schoolId}) ? Schools.findOne({schoolId:schoolId}).shortName : undefined
})

Blaze.registerHelper("subjectName", function(subjectId) {
    return Subjects.findOne({subjectId:subjectId}) ? Subjects.findOne({subjectId:subjectId}).name_kz : undefined
})

Blaze.registerHelper("subjectFromEnglish", function(subject) {
    return Subjects.findOne({name_en:subject}) ? Subjects.findOne({name_en:subject}).name_kz : undefined
})

Blaze.registerHelper("monthName", function(monthId) {
    return TimeFormat.findOne({monthId:monthId}) ? TimeFormat.findOne({monthId:monthId}).monthKazakh : undefined
})

Blaze.registerHelper("eventName", function(event) {
    return SchoolPerformaCriterias.findOne({criteria:event}) ? SchoolPerformaCriterias.findOne({criteria:event}).criteria_kaz : undefined
})

Blaze.registerHelper("olympiadName", function(olympiadId) {
    return Olympiads.findOne({olympiadId:olympiadId}) ? Olympiads.findOne({olympiadId:olympiadId}).name : undefined
})

Blaze.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue,
        "<": lvalue < rvalue,
        ">": lvalue > rvalue
    }[operator];
})

Blaze.registerHelper("round", function(value,number) {
    return number.toFixed(value)
})

Blaze.registerHelper("divide", function(value,number) {
    return value/number
})

academicYear = new ReactiveVar('2018-2019')
