{% if useHelper -%}
import helper from 'helpers/steinerHelper';

export default helper.createApi('{{name}}');
{%- else -%}
import { apiCreator } from 'steiner';

import client from 'apis/client';

export default apiCreator('{{name}}', client);
{%- endif %}