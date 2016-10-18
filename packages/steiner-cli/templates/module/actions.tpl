{% if useHelper -%}
    import helper from 'helpers/steinerHelper';
    {% set obj = 'helper' %}
{%- else -%}
    import { actionCreator } from 'steiner';
    {%  set obj = 'actionCreator' %}
{%- endif %}
export const actionTypes = {{obj}}.createActionTypes('{{name}}');
export const actions = {{obj}}.createActions('{{name}}', actionTypes);