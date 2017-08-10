export class Validator
{
    constructor(props)
    {
        this.rules = props.rules || [];
    }

    run(field, value)
    {
        let errors = [];

        this.rules.forEach(function(rule){
            if(!rule.check(field, value))
                errors.push(rule.message);
        });

        return errors;
    }
}
