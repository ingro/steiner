import { reducerCreator } from 'steiner';

{% if useHelper -%}
import helper from 'helpers/steinerHelper';
{% set obj = 'helper' %}
{%- else -%}
    {% set obj = 'reducerCreator' %}
{%- endif -%}
import { actionTypes } from '../actions/{{name}}';

{% if useHelper %}
    export const DEFAULT_STATE = helper.createDefaultState();
{%- else -%}
    export const DEFAULT_STATE = reducerCreator.DEFAULT_STATE;
{%- endif %}

const handlers = {{obj}}.createHandlers(actionTypes);

export default reducerCreator.createReducer(handlers, DEFAULT_STATE);

export const selectors = reducerCreator.createSelectors('{{name}}');