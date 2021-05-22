<template>
    <div class="row mt-4">
        <div class="col-md-3">
            {{ experience.startDate }} — {{ endDate }}<br>
            <small class="text-secondary">
                <template v-if="years > 0">
                    {{ years }} {{ pluralForm(years, "year") }}
                </template>
                {{ months }} {{ pluralForm(months, "month") }}
            </small>
        </div>
        <div class="col-md-9">
            <b>{{ experience.companyName }}</b>
            <br>
            {{ experience.location }}
            <template v-if="experience.website">
                [ <a :href="experience.website" rel="nofollow">{{ experience.website }}</a> ]
            </template>
            <br>
            {{ experience.companyDescription }}<br>
            <b>{{ experience.position }}</b>
            <small class="text-secondary">
                {{ employmentType }}
                <template v-if="experience.isRemote">
                    (remote)
                </template>
                <template v-if="experience.isFounder">
                    &nbsp; <u>Co-founder</u>
                </template>
            </small>
            <ul>
                <li v-for="duty in experience.duties">
                    {{ duty }}
                </li>
            </ul>
            <template v-if="experience.isInSupport">
                <div class="mb-2">
                    <i class="text-secondary small">
                        This project isn't being actively developed. It's in support mode.
                    </i>
                </div>
            </template>
            <c-badge v-for="technology in experience.technologies" :key="technology">
                {{ technology }}
            </c-badge>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import BadgeComponent from "../../partials/badge.vue";
    import moment from "moment";
    import {pluralForm} from "../../../functions/functions";

    @Component({
        components: {
            cBadge: BadgeComponent
        },
        methods: {
            pluralForm
        }
    })
    export default class ExperienceComponent extends Vue {
        @Prop()
        private experience!: any;

        getDate(date: string): moment.Moment {
            return moment(date, "MM.YYYY").startOf("month");
        }

        getEndDate(): moment.Moment {
            return this.experience.endDate ? this.getDate(this.experience.endDate) : moment().endOf("month");
        }

        getStartDate(): moment.Moment {
            return this.getDate(this.experience.startDate);
        }

        get years(): number {
            return this.getEndDate().diff(this.getStartDate(), "years");
        }

        get months(): number {
            return this.getEndDate().diff(this.getStartDate(), "months") - 12 * this.years;
        }

        get employmentType(): string {
            let str = this.experience.employmentType;
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        get endDate(): string {
            return this.experience.endDate ? this.experience.endDate : "Now";
        }
    }
</script>

<style scoped>

</style>
