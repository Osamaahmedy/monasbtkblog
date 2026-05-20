import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="font-mikhak-bold text-3xl text-gray-900">Profile Settings</h2>
                    <p className="text-gray-500 font-mikhak-regular mt-1">Manage your account information and security preferences.</p>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="space-y-8">
                <div className="grid grid-cols-1 gap-8">
                    {/* Profile Information */}
                    <div className="bg-white/70 backdrop-blur-md p-8 shadow-xl sm:rounded-3xl border border-white">
                        <div className="max-w-2xl">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </div>
                    </div>

                    {/* Security / Password */}
                    <div className="bg-white/70 backdrop-blur-md p-8 shadow-xl sm:rounded-3xl border border-white">
                        <div className="max-w-2xl">
                            <UpdatePasswordForm />
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-red-50/30 backdrop-blur-md p-8 shadow-xl sm:rounded-3xl border border-red-100">
                        <div className="max-w-2xl">
                            <DeleteUserForm />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
