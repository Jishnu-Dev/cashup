export default function Page({ params }) {
    return (
        <section>
            <h1 className="text-lg font-medium text-green-800 capitalize">{params.slug}</h1>
        </section>
    )
}