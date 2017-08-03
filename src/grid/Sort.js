export class Sort
{
    constructor(field, order)
    {
        this.field = field;
        this.order = order || 'ASC';
    }
    toggle()
    {
        this.order = this.order == 'ASC' ? 'DESC' : 'ASC';

        // Return the instance because what one can expect it's the object with the field and order properties
        return this;
    }
}
