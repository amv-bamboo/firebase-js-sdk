Project: /docs/reference/js/_project.yaml
Book: /docs/reference/_book.yaml
page_type: reference

{% comment %}
DO NOT EDIT THIS FILE!
This is generated by the JS SDK team, and any local changes will be
overwritten. Changes should be made in the source code at
https://github.com/firebase/firebase-js-sdk
{% endcomment %}

# ImagenModelParams interface
> This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.
> 

Parameters for configuring an [ImagenModel](./ai.imagenmodel.md#imagenmodel_class)<!-- -->.

<b>Signature:</b>

```typescript
export interface ImagenModelParams 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [generationConfig](./ai.imagenmodelparams.md#imagenmodelparamsgenerationconfig) | [ImagenGenerationConfig](./ai.imagengenerationconfig.md#imagengenerationconfig_interface) | <b><i>(Public Preview)</i></b> Configuration options for generating images with Imagen. |
|  [model](./ai.imagenmodelparams.md#imagenmodelparamsmodel) | string | <b><i>(Public Preview)</i></b> The Imagen model to use for generating images. For example: <code>imagen-3.0-generate-002</code>.<!-- -->Only Imagen 3 models (named <code>imagen-3.0-*</code>) are supported.<!-- -->See [model versions](https://firebase.google.com/docs/vertex-ai/models) for a full list of supported Imagen 3 models. |
|  [safetySettings](./ai.imagenmodelparams.md#imagenmodelparamssafetysettings) | [ImagenSafetySettings](./ai.imagensafetysettings.md#imagensafetysettings_interface) | <b><i>(Public Preview)</i></b> Safety settings for filtering potentially inappropriate content. |

## ImagenModelParams.generationConfig

> This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.
> 

Configuration options for generating images with Imagen.

<b>Signature:</b>

```typescript
generationConfig?: ImagenGenerationConfig;
```

## ImagenModelParams.model

> This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.
> 

The Imagen model to use for generating images. For example: `imagen-3.0-generate-002`<!-- -->.

Only Imagen 3 models (named `imagen-3.0-*`<!-- -->) are supported.

See [model versions](https://firebase.google.com/docs/vertex-ai/models) for a full list of supported Imagen 3 models.

<b>Signature:</b>

```typescript
model: string;
```

## ImagenModelParams.safetySettings

> This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.
> 

Safety settings for filtering potentially inappropriate content.

<b>Signature:</b>

```typescript
safetySettings?: ImagenSafetySettings;
```
